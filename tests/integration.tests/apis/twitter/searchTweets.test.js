const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const searchTweets = require('../../../../components/twitter/api/searchTweets');

const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe('#dev Twitter API - Search Tweets', function() {
    let minLikes = 3;
    let searchQuery  = { minLikes, query: '#heatcheckme (filter:quote OR filter:replies)'};

    it('#dev Search tweets', function() {
        // searchQuery  = { minLikes, query: '#heatcheckme'};
        searchQuery  = { minLikes, query: '(#heatcheckme (is:quote OR is:reply)) OR (#heatchecked)'};

        console.log('SEARCH QERY', searchQuery);

        return searchTweets(searchQuery)
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
