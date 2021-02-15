const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const searchUser = require('../../../../components/twitter/api/searchUser');

const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe('#dev Twitter API - fetch user', function() {
    it('#flaky Fetch User', function() {

        // Flaky because tweet might be deleted.
        let username = 'testing_another';

        return searchUser(username)
        .then(res => {
            expect(res).to.have.property('name', 'AnotherBotTestingAccount');
            expect(res).to.have.keys('type', ...tweetKeys, 'originalTweet');
            expect(res.id).to.equal(id);
            expect(res).to.have.property('type', 'quote');

            expect(res.originalTweet).to.have.keys(tweetKeys);
            expect(res.text).to.match(/My mans needs a #HEATCHECKME/);
            expect(res.originalTweet.text).to.match(/Ima cry now/);
        });
    });
});
