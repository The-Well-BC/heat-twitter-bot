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

            expect(item).to.include.keys(...tweetKeys, 'type', 'conversationID');

            // Test user objects
            let users = [item.user];

            // Test tweets
            let tweets = [item, item.originalTweet].filter(i => i != undefined && i != null);

            if(item.originalTweet) {
                expect(item.originalTweet).to.have.keys(...tweetKeys);
                users.push(item.originalTweet.user);
            }

            expect(users).to.all.have.keys(userKeys);

            expect(Object.values(users).flat().map(i => i.username)).to.all.not.be.undefined

            expect(item.type).to.be.oneOf(tweetTypes);
        });
    });
}

