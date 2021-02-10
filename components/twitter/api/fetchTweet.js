const fetchApi = require('./_fetchTweet');

module.exports = (id) => {
    return fetchApi(id)
    .then(res => {
        console.log('TWEET RESPONSE', res);
        let type, originalTweet = {},
            tweet = {
                text: res.text,
                user: {
                    username: res.user.screen_name
                }
            };

        if(res.in_reply_to_status_id) {
            type = 'reply';

            return fetchApi(res.in_reply_to_status_id_str)
            .then(res2 => {
                // console.log('ORIGINAL TWEET', res2);
                originalTweet = {
                    user: {
                        username: res.user.screen_name
                    },
                    text: res2.text
                }

                return { type, originalTweet, tweet }
            });
        } else if(res.is_quote_status === true) {
            type = 'quote';
            originalTweet = {
                text: res.quoted_status.text,
                user: {
                    username: res.quoted_status.user.screen_name
                }
            }
        }
        return { type, originalTweet, tweet }
    });
}

