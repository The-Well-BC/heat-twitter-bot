const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const searchTweets = require('../../../../components/twitter/api/searchTweets');
const searchTweets2 = require('../../../../components/twitter/api/searchTweets2');

const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe('Twitter API - Search Tweets', function() {
    let minLikes = 3;
    let searchQuery  = { minLikes, query: '#heatcheckme (filter:quote OR filter:replies)'};

    it('#dev Search tweets', function() {
        return searchTweets(searchQuery)
        .then(res => {
            expect(res).to.not.be.empty;
            expect(res).to.all.have.keys(...tweetKeys, 'originalTweet', 'type', 'hashtags');
                expect(res).to.all.be.tweet;
            expect(res).to.all.satisfy(tweet => {
                expect([tweet.user, tweet.originalTweet.user]).to.all.have.property('id');
                expect(tweet.likes).to.be.at.least(minLikes);
                expect(tweet.type).to.be.oneOf(['reply', 'quote']);

                return true;
            });
        });
    });
    it('#dev Search tweets 2', function() {
        // searchQuery  = { minLikes, query: '#heatcheckme'};
        searchQuery  = { minLikes, query: '(#heatcheckme (is:quote OR is:reply)) OR (#heatchecked)'};

        console.log('SEARCH QERY', searchQuery);

        return searchTweets2(searchQuery)
        .then(res => {
            expect(res).to.not.be.empty;
            expect(res).to.all.have.keys(...tweetKeys, 'originalTweet', 'type', 'hashtags', 'conversationID');
            expect(res).to.all.satisfy(tweet => {
                expect([tweet.user, tweet.originalTweet.user]).to.all.have.property('id');
                expect(tweet.likes).to.be.at.least(minLikes);
                expect(tweet.type).to.be.oneOf(['reply', 'quote']);

                return true;
            });
        });
    });
});
