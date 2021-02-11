const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const heatcheckPayout = require('../../../../components/twitter/heatcheckPayouts');

let tweetID = '1353112292414648320';
const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe('#dev #flaky Twitter API - HEATCHECK artist', function() {
    it('Send heatcheck confirmation tweet and claim link', function() {
        return heatcheckPayout(tweetID)
        .then(res => {
            expect(res).to.have.keys(...tweetKeys, 'type', 'originalTweet');
            expect(res.text).to.match(/#HEATCHECKME/);
            expect(res.originalTweet).to.have.keys(...tweetKeys);
            expect(res.originalTweet.text).to.match(/Split/);
        });
    });
});
