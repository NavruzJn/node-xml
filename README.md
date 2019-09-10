# node-xml

1. Install all libraries
```npm install```
2. Launch redis by ```redis-server```
3. Execute ```npm install```


After launching
1. Get all news from https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en by calling 
/api/news/from/google
   It will get all the news from the source and keep it in redis
2. You can get all the news titles by calling get point /api/news
