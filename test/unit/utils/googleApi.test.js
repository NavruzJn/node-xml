import {GoogleNews} from '../../../src/utils/googleNews'

describe('googleApi/news', () => {
    describe('Get news', () => {
        it('should return the response with `channel`, `item` parameters', async () => {
            const ctx = {
                status: 200,
                throw: function (err) {
                    console.log(err);
                }
            };
            const response = await GoogleNews.getGoogleNews(ctx);

            expect(Object.keys(response)).toEqual(true);
        });
    });

});
