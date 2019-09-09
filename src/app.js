import Koa from 'koa';
import Http from 'http';
import cors from '@koa/cors';
import respond from 'koa-respond';
import body from 'koa-body';
import serve from 'koa-static';

import router from './router';

export async function createServer() {
  const app = new Koa();

  app
      .use(cors())
      .use(serve(process.cwd() + '/static'))
      .use(respond())
      .use(body({ multipart: true }))
      .use(router());

  app.on('error', (e, ctx) => {
    console.error(e.message);
    ctx.send(e.statusCode || 400, { error: e.message });
  });

  const server = Http.createServer(app.callback());

  console.log('Server created, ready to listen...');
  return server;
}
