import {NewsModel} from "../model/News";
import _ from "lodash";

class News {
  static async createNews(NewsData) {
    return await new NewsModel({ ...NewsData }).createNews();
  }

  static async getNewsFromGoogleUrl(allNewsData) {
    allNewsData[0].item.forEach(async (item) => {
      await new NewsModel(item.guid[0]._, item.title[0], item.link[0], item.pubDate[0], item.description[0], item.source[0]._).createNews();
    });
    return allNewsData[0].item.map(item => _.pick(item, ["title"]));
  }

  static async getNewsAll() {
    return await NewsModel.getNewsAll()
  }

  static async getNews(id) {
    let News = await NewsModel.getNews(id);
    News = _.pick(News, ["_description","_source"]);
    return News;
  }

  static async removeNews(id) {
    return await NewsModel.remove(id);
  }
}

module.exports = News;
