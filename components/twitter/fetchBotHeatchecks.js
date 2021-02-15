let searchTweets = require('./api/searchTweets');

module.exports = function() {
    let searchQuery  = { query: '#heatchecked -is:retweet from:HEATCHECKME'};

    return searchTweets(searchQuery)
    .then(res => {
        let response = [...res];

        return response.filter(item => item !== false);
    });
}
