import https from "https";
import xml2js from 'xml2js';

import News from "../controllers/News"

const parser = new xml2js.Parser();

const googleNewsUrl = 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en';

export class GoogleNews {
    constructor() {
        this._news = [];
    }
    static async getGoogleNews(ctx) {
        let data = '';
        await https.get(googleNewsUrl, function (res) {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                res.on('data', function (data_) {
                    data += data_.toString();
                });
                res.on('end', async function () {
                    await parser.parseString(data, async function (err, result) {
                        await News.getNewsFromGoogleUrl(result.rss.channel);
                    });
                });
                res.on('error', function (err) {
                    ctx.throw(err);
                })
            }
        });

        return true;
    }

    static setNews(news) {
        this._news = news;
    }

    static getNews(news) {
        return this._news;
    }
}
