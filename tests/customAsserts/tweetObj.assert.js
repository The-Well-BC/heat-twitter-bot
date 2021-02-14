const expect = require('chai').expect;

module.exports = function(chai, utils) {
    let Assertion = chai.Assertion;
    let expect = chai.expect;

    const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];
    const userKeys = ['id', 'username', 'name'];
    const tweetTypes = ['reply', 'quote', 'tweet'];

    Assertion.addProperty('tweet', function() {
        let arr = this._obj;

        return arr.every(item => {

            let users = [item.user];

            expect(item).to.include.keys(...tweetKeys, 'type', 'conversationID');

            let tweets = [item, item.originalTweet].filter(i => i != undefined && i != null);

            expect(tweets.map(t => t.user)).to.all.have.keys('id', 'username', 'name');

            if(item.originalTweet) {
                expect(item.originalTweet).to.have.keys(...tweetKeys);
                users.push(item.originalTweet.user);
            }

            expect(users).to.all.have.keys(userKeys);

            expect(item.type).to.be.oneOf(tweetTypes);
        });
    });
}

