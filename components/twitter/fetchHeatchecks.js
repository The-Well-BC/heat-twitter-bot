let searchTweets = require('./api/searchTweets');

module.exports = function(data) {

    let { minLikes, minRetweets } = data;

    if(minLikes == null || minLikes == undefined)
        minLikes = 10;

    let searchQuery  = { minLikes, ...minRetweets && {minRetweets}, query: '#heatcheckme (filter:quote OR filter:replies)'};

    return searchTweets(searchQuery)
    .then(res => {
        let response = [...res];
        return response.filter(i => ['reply', 'quote'].includes(i.type));;
    });
}
