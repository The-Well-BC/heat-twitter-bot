const Twitter = require('twitter');

module.exports = (payload) => {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_SECRET_KEY,
        access_token_key: process.env.TWITTER_BOT_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_BOT_ACCESS_TOKEN_SECRET,
    });

    let body = {
        status: payload.text
    };

    if(payload.mediaID)
        body.media_ids = payload.mediaID;

    return new Promise(function(resolve, reject) {
        client.post('statuses/update', body, function(error, tweet, response) {

            if(error) {
                reject(error);
            } else
                resolve({ tweet, response });
        });
    });
}

