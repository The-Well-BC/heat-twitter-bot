const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const fetchTweet = require('../../../../components/twitter/api/fetchTweet');
const heatcheckTweet = require('../../../../components/twitter/heatcheck.tweets');
const fetchHeatchecks = require('../../../../components/twitter/fetchHeatchecks');

const sampleStream = require('../../../sampleStreamEvents');

describe('Twitter API - Search Tweets', function() {
    it('#dev #flaky Fetch #HEATCHECKME tweets', function() {
        let minLikes = 3;

        return fetchHeatchecks({ minLikes })
        .then(res => {
            expect(res).to.not.be.empty;
            expect(res).to.all.be.tweet;
            expect(res).to.all.satisfy(tweet => {
                expect(tweet.likes).to.be.at.least(minLikes);
                expect(tweet.type).to.be.oneOf(['reply', 'quote']);

                return true;
            });
        });
    });
});
