import 'babel-register';
import 'babel-polyfill';

import Koa from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
import commandLineArgs from 'command-line-args';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import fs from 'fs';
import pem from 'pem';
import spdy from 'spdy';
import {insertString} from '../app/lib';
import routes from '../app/routes';

function generatePage(content) {
  let html = fs.readFileSync('dist/client/index.html', 'utf8');
  let mountPoint = '<div id="app">';
  let insertPoint = html.indexOf(mountPoint) + mountPoint.length;
  return insertString(html, insertPoint, content);
}

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = `<h1>${err.message}</h1><pre>${err.stack}</pre>`;
    ctx.status = err.status || 500;
  }
});

app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

app.use(async (ctx, next) => {
  let matched = true;
  match({routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.status = 500;
      ctx.message = error.message;
    } else if (redirectLocation) {
      ctx.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      ctx.status = 200;
      ctx.body = generatePage(ReactDOMServer.renderToString(<RouterContext {...renderProps} />));
    } else {
      matched = false;
    }
  });
  if(!matched) {
    await next();
  }
});

app.use(serve('dist/client'));

const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number, defaultValue: 3000 },
  { name: 'https', alias: 's', type: Boolean, defaultValue: false },
];
const options = commandLineArgs(optionDefinitions);

if (!options.https) {
  app.listen(options.port);
  console.log(`Listening on http://localhost:${options.port}`);
} else {
  pem.createCertificate({
    days: 1,
    selfSigned: true
  }, function(err, keys){
    const credentials = {
      key: keys.serviceKey,
      cert: keys.certificate
    };

    const server = spdy.createServer(credentials, app.callback());
    server.listen(options.port, function() {
      console.log(`Listening on https://localhost:${options.port}`);
    });
  });
}
