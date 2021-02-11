const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const fetchTweet = require('../../../../components/twitter/api/fetchTweet');
const heatcheckTweet = require('../../../../components/twitter/heatcheck.tweets');
const fetchHeatchecks = require('../../../../components/twitter/fetchHeatchecks');

const sampleStream = require('../../../sampleStreamEvents');

describe('Twitter API', function() {
    it('Fetch quote tweet', function() {
        return fetchTweet(sampleStream.quoteTweet.data.id)
        .then(res => {
            expect(res).to.have.keys('type', 'tweet', 'originalTweet');
            expect(res).to.have.property('type', 'quote');

            expect([res.tweet, res.originalTweet]).to.all.have.keys('text', 'user', 'retweets', 'likes');
            expect(res.tweet.text).to.match(/#HEATCHECKME This is a quote tweet/);
            expect(res.originalTweet.text).to.match(/Another artwork upload/);
        });
    });

    it('Fetch reply tweet', function() {
        return fetchTweet(sampleStream.reply.data.id)
        .then(res => {
            expect(res).to.have.keys('type', 'tweet', 'originalTweet');
            expect(res).to.have.property('type', 'reply');
            expect([res.tweet, res.originalTweet]).to.all.have.keys('text', 'user', 'retweets', 'likes');
            expect(res.tweet).to.eql({
                text: '#HEATCHECK This is a tweet reply',
                user: {
                    username: 'testing_another'
                },
                likes: 0, retweets: 0
            });
            expect(res.originalTweet.text).to.match(/Testing testing... This is my art asdff/);
        });
    });

    it('#dev #flaky Fetch #HEATCHECKME tweets', function() {
        let minLikes = 0;

        return fetchHeatchecks({ minLikes })
        .then(res => {
            expect(res).to.not.be.empty;
            expect(res).to.all.have.keys('likes', 'retweets', 'originalTweet', 'type', 'text', 'hashtags', 'user');
            expect(res).to.all.satisfy(tweet => {
                expect(tweet.likes).to.be.at.least(minLikes);
                expect(tweet.type).to.be.oneOf(['reply', 'quote']);

                return true;
            });
        });
    });
});

describe('Fetch #HEATCHECK tweet', function() {
    it('Fetch #HEATCHECK tweet', function() {
        return heatcheckTweet(sampleStream.quoteTweet)
        .then(res => {
            expect(res).to.have.keys('artist', 'curator', 'artwork');
            expect([res.artist, res.curator]).to.all.equal("testing_another");

            // expect(artwork).to.equal();
        });
    });
});
