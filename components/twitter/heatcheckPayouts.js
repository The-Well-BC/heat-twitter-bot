const axios = require('axios');

const MIN_LIKES = 3;
const tweet = require('./api/tweet');
const fetchHeatchecks = require('./fetchHeatchecks');

module.exports = function(payload) {
    return fetchHeatchecks({ minLikes: MIN_LIKES })
    .then(res => {
        // return Promise.all(res.map(item => {
        let promises = res.map(item => {
            let artistID = item.originalTweet.user.id;
            let artist = item.originalTweet.user.username;
            let curator = item.user.username;

            let message = {};

            message.text = `Yo @${artist}, you've been #HEATCHECKED.\nTap in to claim your $HEAT - `;

            // Reply to #HEATCHECKME tweet by curator, but put artist in the username field
            message.replyTo = {
                id: item.id,
                username: curator
            }

            let mintgateURL = `https://link.mintgate.app/api/2/drop/create?api=true&uid=220&incby=1&claimmax=1&tid=$HEAT&fortwitter=${artist}&pkey=${process.env.MINTGATE_PKEY}`;

            return axios.get(mintgateURL)
            .then(res2 => {
                let claimLink = res2.data.claim_url;

                message.text += claimLink;

                return tweet(message)
            }).catch(e => {
                console.log('ERROR CREATING TOKEN CLAIM LINK\nError:', e);
                throw e;
            });
        });

        console.log('PROMISES', promises);

        return Promise.all(promises);
    });
}
