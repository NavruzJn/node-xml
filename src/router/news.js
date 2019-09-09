import Router from 'koa-router';

import News from '../controllers/News';

import {GoogleNews} from '../utils/googleNews';

const router = new Router();

router
    .prefix("/api/news")

    .get("/", async ctx => {
      try {
        ctx.response.body = await News.getNewsAll();
      } catch (error) {
        console.log("error", error);
        ctx.status = 402;
        ctx.body = "News not found";
      }
    })

    .get("/:id", async ctx => {
      try {
        ctx.response.body = await News.getNews(ctx.params.id);
      } catch (error) {
        console.log("error", error);
        ctx.status = 402;
        ctx.body = "News not found";
      }
    })

    .get("/from/google", async ctx => {
      try {
          await GoogleNews.getGoogleNews();
          ctx.status = 200;
          ctx.body = await News.getNewsAll();
      } catch (error) {
        console.log("error", error);
        ctx.status = 402;
        ctx.body = "News not found";
      }
    })

    .delete("/:id", async ctx => {
      try {
        ctx.response.body = await News.removeNews(ctx.params.id);
      } catch (error) {
        console.log("error", error);
        ctx.status = 402;
        ctx.body = "News not found";
      }
    });

module.exports = router;
