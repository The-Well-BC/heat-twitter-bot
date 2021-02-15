let searchTweets = require('./api/searchTweets');

module.exports = function(data) {
    let { minLikes, minRetweets } = data;

    if(minLikes == null || minLikes == undefined)
        minLikes = 10;

    let start_time = new Date(1613364892494).toISOString();

    let searchQuery  = { query: `(#heatcheckme (is:quote OR is:reply)) OR (#heatchecked from:HEATCHECKME)&start_time=${start_time}` };

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

            /*
            console.log('\n\n\nUSERNAME:', i.user.username, '\n');
            botTweets.reduce((acc, b) => {
                console.log('BOT TEXT DOES NOT INCLUDE TWEET USERNAME:', acc,'\n');
                console.log('BB:', b.text);
                return acc && !b.text.includes('@' + i.user.username);
            }, true);

            let ctemp = !botTweets.reduce((acc, b) => acc && b.text.includes('@' + i.user.username), true);

            console.log('TEMP CONDITION:', ctemp);
            */

            // return c1 && ctemp;
            return c1;
        });
    });
}
