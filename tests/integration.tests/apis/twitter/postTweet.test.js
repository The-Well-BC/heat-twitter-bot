const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const tweet = require('../../../../components/twitter/api/tweet');

const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe.only('#dev Twitter API', function() {
    it('Post tweet reply', function() {

        // Flaky because tweet might be deleted.
        let payload = {
            text: 'Testing tweet reply...\n' + new Date(),
            replyTo: {
                id: '1360303032039268352',
                username: 'Zigyzoe'
            }
        }

        return tweet(payload)
        .then(res => {
            expect(res).to.have.keys('id', 'text', 'user', 'originalTweet');
            expect(res.originalTweet).to.have.property('id', payload.replyTo.id);
            expect(res.text).to.match(/^@Zigyzoe/);
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
