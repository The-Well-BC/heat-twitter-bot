const fetchTweet = require('./api/fetchTweet');

module.exports = (payload) => {

    let id = payload.data.id;

    console.log('PAYLOAD', payload, '\nID:', id);

    return fetchTweet(id)
    .then(res => {
        let response = res;

        let artist = res.originalTweet.user.username,
            artwork,
            curator = res.tweet.user.username;

        return { artist, artwork, curator };
    });
}
