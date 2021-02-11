const MIN_LIKES = 3;
const fetchTweet = require('./api/fetchTweet');

module.exports = function(payload) {
    return fetchTweet(payload)
    .then(res =>{
        console.log('HEATCHECK PAYOUTS', res);

        let artist = res.originalTweet.user.username;
        let curator = res.user.username;

        let message = `Yo @${artist}, you've been #HEATCHECKED.\nTap in to claim your $HEAT - `;

        let claimLink = `https://link.mintgate.app/api/2/drop/create?api=true&uid=220&incby=1&claimmax=1&tid=$HEAT&fortwitter=${artist}&pkey=${process.env.MINTGATE_PKEY}`;

        message = message + claimLink;

        console.log('CLAIM LINK', message);

        if(res.originalTweet.likes > MIN_LIKES) {
            return postTweet(message)
        }
    });
}
