const Twitter = require('twitter');
const axios = require('axios');

module.exports = (usernames) => {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_SECRET_KEY,
        access_token_key: process.env.TWITTER_BOT_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_BOT_ACCESS_TOKEN_SECRET,
    });

    if(!Array.isArray(usernames))
        usernames = [usernames];
    let usernameStr = usernames.join();

    let headers = {Authorization:  `Bearer ${process.env.TWITTER_BEARER_TOKEN}`};
    let url = `https://api.twitter.com/2/users/by?usernames=${usernameStr}&user.fields=profile_image_url,description`;

    return axios.get(url, { headers })
    .then(response => {
        let users = response.data.data;

        return users.map(u => {
            return {
                id: u.id,
                username: u.username,
                description: u.description,
                avatar: u.profile_image_url,
                displayName: u.name
            }
        });
    }).catch(e => {
        if(usernameStr == '')
            return [];
        else {
            console.log('ERROR', e);
            throw e;
        }
    });
}


