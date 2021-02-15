const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const heatcheckPayout = require('../../../../components/twitter/heatcheckPayouts');

let tweetID = '1353112292414648320';
const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe('#watch #flaky Twitter API - HEATCHECK artist', function() {
    // Won't work here because we're using the testing twitter bot.
    this.timeout(10000);
    it('Send heatcheck confirmation tweet and claim link', function() {
        return heatcheckPayout()
        .then(res => {
            expect(res).to.all.be.tweet;
            expect(res.map(i => i.text)).to.all.have.string('you\'ve been #HEATCHECKED.\nTap in to claim your $HEAT');

            expect(res).to.all.have.keys('originalTweet');
            expect(res.map(i => i.originalTweet)).to.all.have.property('text');
        });
    });
});
