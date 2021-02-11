const Twitter = require('twitter');
const fetchTweet = require('./fetchTweet');

module.exports = (payload) => {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_SECRET_KEY,
        access_token_key: process.env.TWITTER_BOT_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_BOT_ACCESS_TOKEN_SECRET,
    });

    if(!payload.query)
        throw new Error('Must supply search query');

    let q = payload.query;

    if(!isNaN(payload.minLikes))
        q += ' min_faves:' + payload.minLikes;

    if(payload.minRetweets)
        q += ' min_retweets:' + payload.minRetweets;

    console.log('QUERY:', q);

    return new Promise(function(resolve, reject) {
        client.get('search/tweets', {q}, function(error, tweets, response) {
            if(error) {
                reject(error);
            } else {
                // console.log(tweets);
                resolve( Promise.all(tweets.statuses.map(async item => {
                    /*
                    if(item.entities.hashtags.length < 1) {
                        console.log('ENTITIES', item.entities);
                        console.log('#HASHTAGS', item.entities.hashtags);
                    }
                    */

                    // console.log('ITEM', item);

                    let originalTweet, type;

                    if(item.retweeted_status) {
                        type = 'retweet';

                        originalTweet = {
                            text: item.retweeted_status.text,
                            user: { 
                                username: item.retweeted_status.user.screen_name
                            }
                        }
                    } else if(item.is_quote_status === true) {
                        type = 'quote';
                        originalTweet = {
                            text: item.quoted_status.text,
                            user: { 
                                username: item.quoted_status.user.screen_name
                            }
                        }
                    } else if(item.in_reply_to_status_id) {
                        type = 'reply';
                        let otweet = await fetchTweet(item.in_reply_to_status_id_str);
                        originalTweet = otweet.tweet;
                    }

                    return {
                        type,
                        likes: item.favorite_count,
                        retweets: item.retweet_count,
                        text: item.text,
                        user: {
                            username: item.user.screen_name
                        },
                        hashtags: item.entities.hashtags.map(h => h.text),
                        ...originalTweet && {originalTweet}
                    }
                })));
            }
        });
    });
}

