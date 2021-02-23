let searchTweets = require('./api/searchTweets');

module.exports = function(data) {
    let { minLikes, minRetweets } = data;

    if(minLikes == null || minLikes == undefined)
        minLikes = 10;

    let searchQuery  = { query: `(#heatcheckme (is:quote OR is:reply)) OR (#heatchecked from:HEATCHECKME)` };

    return searchTweets(searchQuery)
    .then(res => {
        let response = [...res];
        let botTweets = response.filter(i => /^heatcheckme$/i.test(i.user.username) === true);
        // console.log('BOT TWEETS', botTweets);

        let tweets = response.filter(i => ['reply', 'quote'].includes(i.type));

        let heatcheckmes = res.filter(i => /#heatcheckme/i.test(i.text) === true);
        // console.log('HEATCHECKME TWEETS', heatcheckmes);

        return heatcheckmes.filter(i => {
            let c1 = i.likes >= minLikes;
            let botConvoIds = botTweets.map(i => i.conversationID);

            let c2 = !botConvoIds.includes(i.conversationID);

            return c1 && c2;
        });
    });
}
