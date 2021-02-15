const axios = require('axios');

module.exports = (id) => {
    let url = `https://api.twitter.com/2/tweets/${ id }`;
    url += `?tweet.fields=conversation_id,created_at,public_metrics,author_id,referenced_tweets&expansions=author_id,referenced_tweets.id,referenced_tweets.id.author_id&user.fields=id,name,username`;
    
    let headers = {
        authorization: `Bearer ${ process.env.TWITTER_BEARER_TOKEN }`
    };

    return axios.get(url, { headers })
    .then(res => {
        res = res.data;
        console.log('RESPOSNE', res);

        let tweet = res.data, originalTweet,
            includes = res.includes;

        let likes = tweet.public_metrics.like_count,
            retweets = tweet.public_metrics.retweet_count;

        let user = {
            id: tweet.author_id
        }
        console.log('TWEET', tweet);
        
        let type = (tweet.referenced_tweets && tweet.referenced_tweets.length === 1) ? tweet.referenced_tweets[0].type : 'tweet';
        type = (type == 'replied_to') ? 'reply' : (type == 'quoted') ? 'quote' : 'tweet';

        if(tweet.referenced_tweets && tweet.referenced_tweets.length == 1) {
            originalTweet = {
                id: tweet.referenced_tweets[0].id
            }
        }

        console.log('INCLUDES', includes);
        includes.tweets.forEach(e => {
            if(originalTweet && originalTweet.id == e.id) {
                originalTweet.text = e.text;
                originalTweet.user = {
                    id: e.author_id
                }
                originalTweet.likes = e.public_metrics.like_count;
                originalTweet.retweets = e.public_metrics.like_count;
                return;
            }
        });

        includes.users.forEach(e => {
            if(user.id == e.id) {
                user.name = e.name;
                user.username = e.username;
            }

            if(originalTweet && originalTweet.user.id == e.id) {
                originalTweet.user.name = e.name;
                originalTweet.user.username = e.username;
            }
        });

        return {
            id: tweet.id,
            type,
            text: tweet.text,
            likes, retweets,
            user,
            ...originalTweet && {originalTweet},
            conversationID: tweet.conversation_id
        }
    });
}

