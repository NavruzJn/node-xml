import redis from '../redis/redis'

export class NewsModel {
    constructor(guid, title, link, pubDate, description, source) {
        this._guid = guid;
        this._title = title;
        this._link = link;
        this._pubDate = pubDate;
        this._description = description;
        this._source = source;
    }

    set guid(guid) {
        this._guid = guid;
    }

    get guid() {
        return this._guid;
    }

    set title(title) {
        this._title = title;
    }

    get title() {
        return this._title;
    }
    set link(link) {
        this._link = link;
    }

    get link() {
        return this._link;
    }

    set pubDate(pubDate) {
        this._pubDate = pubDate;
    }

    get pubDate() {
        return this._pubDate;
    }

    set description(description) {
        this._description = description;
    }

    get description() {
        return this._description;
    }

    set source(source) {
        this._source = source;
    }

    get source() {
        return this._source;
    }

    async createNews() {
        await redis.hmset(`hash:news/${this._guid}`, this);
        return this._title;
    }

    static async getNewsAll() {
        let newsTitles = [];
        const newsKeys = await redis.keys('*', async function (err, keys) {
            keys.forEach(async (key) => {
                newsTitles.push(await redis.hget(`hash:news/${key}`, "_title"));
            })
        });
        return newsTitles;
    }

    static async getNews(id) {
        return await redis.hgetAll(`hash:news/${id}`);
    }

    static async remove(guid) {
        return await redis.hdel('hash:news', guid);
    }
}

