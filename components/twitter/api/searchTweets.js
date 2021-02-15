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

    let urlExtra = '?tweet.fields=author_id,conversation_id,in_reply_to_user_id_str,referenced_tweets';

    if(!isNaN(payload.minLikes))
        q += ' min_faves:' + payload.minLikes;

    if(payload.minRetweets)
        q += ' min_retweets:' + payload.minRetweets;

    return new Promise(function(resolve, reject) {
        // let url = 'https://api.twitter.com/2/tweets?ids=1225917697675886593&tweet.fields=author_id,conversation_id,created_at,in_reply_to_user_id,referenced_tweets&expansions=author_id,in_reply_to_user_id,referenced_tweets.id&user.fields=name,username' \

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
                            id: item.retweeted_status.id,
                            text: item.retweeted_status.text,
                            user: { 
                                id: item.retweeted_status.user.id_str,
                                username: item.retweeted_status.user.screen_name
                            }
                        }
                    } else if(item.is_quote_status === true) {
                        type = 'quote';
                        originalTweet = {
                            text: item.quoted_status.text,
                            user: { 
                                id: item.quoted_status.user.id_str,
                                username: item.quoted_status.user.screen_name
                            }
                        }
                    } else if(item.in_reply_to_status_id) {
                        type = 'reply';
                        let otweet = await fetchTweet(item.in_reply_to_status_id_str);
                        originalTweet = otweet;
                        originalTweet.id = otweet.id;
                    }

                    return {
                        id: item.id,
                        type,
                        likes: item.favorite_count,
                        retweets: item.retweet_count,
                        text: item.text,
                        user: {
                            id: item.user.id_str,
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

