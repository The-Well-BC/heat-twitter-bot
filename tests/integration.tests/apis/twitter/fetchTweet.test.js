const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const fetchTweet = require('../../../../components/twitter/api/fetchTweet');
const heatcheckTweet = require('../../../../components/twitter/heatcheck.tweets');
const fetchHeatchecks = require('../../../../components/twitter/fetchHeatchecks');

const sampleStream = require('../../../sampleStreamEvents');

const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe('Twitter API', function() {
    it('#flaky Fetch quote tweet', function() {

        // Flaky because tweet might be deleted.
        let id = '1353112292414648320';

        return fetchTweet(id)
        .then(res => {
            expect(res).to.be.tweet;

            expect(res.id).to.equal(id);
            expect(res).to.have.property('type', 'quote');

            expect(res.text).to.match(/My mans needs a #HEATCHECKME/);
            expect(res.originalTweet.text).to.match(/Ima cry now/);
        });
    });

    it('#flaky Fetch reply tweet', function() {
        let id = '1349611004926296067';
        return fetchTweet(id)
        .then(res => {
            expect(res).to.all.be.tweet;
            expect(res.id).to.equal(id);
            expect(res).to.have.property('type', 'reply');

            expect(res.text).to.equal('CAN I GET A $HEAT CHECK?! #heatcheckme pls');
            expect(res.user.username).to.equal('TheNamesBria_');
            expect(res.originalTweet.text).to.match(/THE TALENT\./);
        });
    });
});
