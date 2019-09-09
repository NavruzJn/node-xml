import compose from 'koa-compose';
import news from './news';

function combineRoutes(routes) {
  if (!Array.isArray(routes)) routes = [].prototype.slice.call(arguments);

  const middleware = [];
  routes.forEach(router => {
    middleware.push(router.routes());
    if (router.allowedMethods) middleware.push(router.allowedMethods());
  });

  return compose(middleware);
}

const routes = [news];

export default () => combineRoutes(routes);
