const Twitter = require('twitter');

module.exports = (payload) => {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_SECRET_KEY,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    let body = {
        status: payload.text
    };

    if(payload.mediaID)
        body.media_ids = payload.mediaID;

    if(payload.replyTo && payload.replyTo.id) {
        body.in_reply_to_status_id = payload.replyTo.id;
        body.status = ` @${payload.replyTo.username}\n\n${body.status}`;
    }

    return new Promise(function(resolve, reject) {
        client.post('statuses/update', body, function(error, tweet) {

            if(error) {
                reject(error);
            } else {

                let originalTweet;

                if(tweet.in_reply_to_status_id_str) {
                    originalTweet = {
                        id: tweet.in_reply_to_status_id_str,
                        user: {
                            id: tweet.in_reply_to_status_id_str,
                            username: tweet.in_reply_to_user_id_str,
                        }
                    }
                }

                resolve({ 
                    id: tweet.id_str,
                    text: tweet.text,
                    user: {
                        id: tweet.user.id_str,
                        username: tweet.user.screen_name
                    },
                    ...originalTweet && {originalTweet}
                });
            }
        });
    });
}

