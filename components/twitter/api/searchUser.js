const Twitter = require('twitter');
const axios = require('axios');

module.exports = (username) => {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_SECRET_KEY,
        access_token_key: process.env.TWITTER_BOT_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_BOT_ACCESS_TOKEN_SECRET,
    });

    let url = `https://api.twitter.com/2/users/by/username/${ username }`

    console.log('URL', url);
    console.log('AUTH', {
        authorization:  `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    })

    return axios.get(url, {
        headers: {Authorization:  `Bearer ${process.env.TWITTER_BEARER_TOKEN}`}
    })
    .then(response => {
        console.log('OGT USER', response.data.data);
        return response.data.data;
    }).catch(e => {
        console.log('ERROR', e);
        throw e;
    });
}


