const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const fetchTweet = require('../../../../components/twitter/api/fetchTweet');
const heatcheckTweet = require('../../../../components/twitter/heatcheck.tweets');

const sampleStream = require('../../../sampleStreamEvents');

describe('Twitter API', function() {
    it('Fetch quote tweet', function() {
        return fetchTweet(sampleStream.quoteTweet.data.id)
        .then(res => {
            expect(res).to.have.keys('type', 'tweet', 'originalTweet');
            expect(res).to.have.property('type', 'quote');

            expect([res.tweet, res.originalTweet]).to.all.have.keys('text', 'user');
            expect(res.tweet.text).to.match(/#HEATCHECKME This is a quote tweet/);
            expect(res.originalTweet.text).to.match(/Another artwork upload/);
        });
    });

    it('Fetch reply tweet', function() {
        return fetchTweet(sampleStream.reply.data.id)
        .then(res => {
            expect(res).to.have.keys('type', 'tweet', 'originalTweet');
            expect(res).to.have.property('type', 'reply');
            expect([res.tweet, res.originalTweet]).to.all.have.keys('text', 'user');
            expect(res.tweet).to.eql({
                text: '#HEATCHECK This is a tweet reply',
                user: {
                    username: 'testing_another'
                }
            });
            expect(res.originalTweet.text).to.match(/Testing testing... This is my art asdff/);
        });
    });
});

describe('#dev Fetch #HEATCHECK tweet', function() {
    it('Fetch #HEATCHECK tweet', function() {
        return heatcheckTweet(sampleStream.quoteTweet)
        .then(res => {
            expect(res).to.have.keys('artist', 'curator', 'artwork');
            expect([res.artist, res.curator]).to.all.equal("testing_another");

            // expect(artwork).to.equal();
        });
    });
});
