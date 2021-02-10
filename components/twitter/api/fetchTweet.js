const fetchApi = require('./_fetchTweet');

module.exports = (id) => {
    return fetchApi(id)
    .then(res => {
        // console.log('TWEET RESPONSE', res);

        let type, originalTweet = {};

        let response = {
            tweet: {
                text: res.text,
                user: {
                    username: res.user.screen_name
                },
                likes: res.favorite_count,
                retweets: res.retweet_count,
            },
        }

        if(res.in_reply_to_status_id) {
            type = 'reply';

            return fetchApi(res.in_reply_to_status_id_str)
            .then(res2 => {
                originalTweet = {
                    text: res2.text,
                    user: {
                        username: res.user.screen_name
                    },
                    likes: res2.favorite_count,
                    retweets: res2.retweet_count
                }

                return { ...response, originalTweet, type }
            });
        } else if(res.is_quote_status === true) {
            type = 'quote';
            originalTweet = {
                text: res.quoted_status.text,
                user: {
                    username: res.quoted_status.user.screen_name
                },
                likes: res.quoted_status.favorite_count,
                retweets: res.quoted_status.retweet_count
            }
        }

        return { ...response, originalTweet, type };
    });
}

