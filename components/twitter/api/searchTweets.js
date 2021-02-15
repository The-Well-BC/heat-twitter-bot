const Twitter = require('twitter');
const axios = require('axios');

module.exports = (payload) => {
    if(!payload.query)
        throw new Error('Must supply search query');

    let q = payload.query;

    if(payload.queries) {
        q = payload.queries.map(query => q += query);
    }

    if(payload.authorID) {
        q += ' author_id:' + payload.authorID;
    }

    // q = q.replace(/\s+/g, '+');
    // q = encodeURIComponent(q);
    q = q.replace(/\(/g, '%28').replace(/\)/g, '%29')
        .replace(/\#/g, '%23')
        .replace(/\:/g, '%3A');

    let url = `https://api.twitter.com/2/tweets/search/recent`;
    if(q)
        url += `?query=${q}&tweet.fields=conversation_id,created_at,public_metrics,author_id,referenced_tweets&expansions=author_id,referenced_tweets.id,referenced_tweets.id.author_id&user.fields=id,name,username&max_results=50`;

    return axios.get(url, {
        headers: {Authorization:  `Bearer ${process.env.TWITTER_BEARER_TOKEN}`}
    })
    .then(response => {
        let includes = response.data.includes;
        return response.data.data.filter(i => {
            let likes = i.public_metrics.like_count;
            let retweets = i.public_metrics.like_count;

            let c = true;

            if(!isNaN(payload.minLikes))
                c = c && (likes < payload.minLikes);

            if(payload.minRetweets)
                c = c && (retweets < payload.minRetweets);

            return c;
        }).map( i => {
            let type = (i.referenced_tweets && i.referenced_tweets.length === 1) ? i.referenced_tweets[0].type : 'tweet';

            type = (type == 'replied_to') ? 'reply' : (type == 'quoted') ? 'quote' : 'tweet';

            switch(type) {
                case 'retweeted':
                    type = 'retweet';
                    break;
                case 'quoted':
                    type = 'quote';
                    break;
            }

            let user = {
                id: i.author_id,
            },
                originalTweet;

            if(i.referenced_tweets && i.referenced_tweets.length == 1) {
                originalTweet = {
                    id: i.referenced_tweets[0].id
                }
            }

            includes.tweets.forEach(e => {
                if(originalTweet && originalTweet.id == e.id) {
                    originalTweet.conversationID = e.conversation_id;
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
                id: i.id,
                type,
                text: i.text,
                ...originalTweet && {originalTweet},
                user,
                conversationID: i.conversation_id,
                likes: i.public_metrics.like_count,
                retweets: i.public_metrics.retweet_count,
            }
        });
    }).catch(e => {
        console.log('ERROR', e);
        throw e;
    });
}



