require("babel-register");
require("babel-polyfill");

import Koa from 'koa';
import serve from 'koa-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import fs from 'fs';
import 'sugar';
import routes from './app/routes';

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
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(async (ctx, next) => {
  match({routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.status = 500;
      ctx.message = error.message;
    } else if (redirectLocation) {
      ctx.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      ctx.status = 200;
      ctx.body = generatePage(renderToString(<RouterContext {...renderProps} />));
    }
  });
  await next();
});

app.use(serve('build/client'));

app.listen(3000);
console.log('Listening on http://localhost:3000');
