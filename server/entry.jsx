require("babel-register");
require("babel-polyfill");

import Koa from 'koa';
import serve from 'koa-static';
import commandLineArgs from 'command-line-args';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import fs from 'fs';
import 'sugar';
import routes from '../app/routes';

function generatePage(content) {
  let html = fs.readFileSync('build/client/index.html', 'utf8');
  let mountPoint = '<div id="app">';
  let insertPoint = html.indexOf(mountPoint) + mountPoint.length;
  return html.insert(content, insertPoint);
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
      ctx.body = generatePage(renderToString(<RouterContext {...renderProps} />));
    } else {
      matched = false;
    }
  });
  if(!matched) {
    await next();
  }
});

app.use(serve('build/client'));

const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number, defaultValue: 3000 }
];
const options = commandLineArgs(optionDefinitions);

app.listen(options.port);
console.log(`Listening on http://localhost:${options.port}`);
