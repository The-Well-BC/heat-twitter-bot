const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const tweet = require('../../../../components/twitter/api/tweet');

const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe('Twitter API', function() {
    it('Post tweet reply', function() {

        // Flaky because tweet might be deleted.
        let payload = {
            text: 'Testing testing...\n' + new Date(),
            replyTo: {
                id: '1359201894153994256',
                username: 'another_testing'
            }
        }

        return tweet(payload)
        .then(res => {
            expect(res).to.have.keys('id', 'text', 'user', 'originalTweet');
            expect(res.originalTweet).to.have.property('id', payload.replyTo.id);
        });
    });

    it('Post tweet', function() {
        // Flaky because tweet might be deleted.
        let payload = {
            text: 'Testing testing...\n' + new Date(),
        }

        return tweet(payload)
        .then(res => {
            expect(res).to.have.keys('id', 'text', 'user');
            expect(res.text).to.equal(payload.text);
        });
    });
});
