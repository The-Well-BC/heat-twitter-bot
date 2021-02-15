const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const fetchBotHeatchecks = require('../../../../components/twitter/fetchBotHeatchecks');
const searchTweets = require('../../../../components/twitter/api/searchTweets2');

const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe('#dev Fetch bot #HEATCHECKED tweets', function() {
    it('Fetch Bot #HEATCHECK tweets', function() {
        return fetchBotHeatchecks()
        .then(res => {
            expect(res).to.not.be.empty;
            expect(res).to.all.be.tweet;
            expect(res.map(i => i.user.id)).to.all.equal('1349520548292923394');
        });
    });
});
