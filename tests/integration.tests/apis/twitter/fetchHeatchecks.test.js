const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const fetchHeatchecks = require('../../../../components/twitter/fetchHeatchecks');
const fetchBotHeatchecks = require('../../../../components/twitter/fetchBotHeatchecks');
const searchTweets = require('../../../../components/twitter/api/searchTweets');

const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe.only('#dev Fetch #HEATCHECKME tweets', function() {
    it('Fetch #HEATCHECKME tweet', function() {
        let minLikes = 3;

        return fetchHeatchecks({ minLikes })
        .then(tweets => {
            console.log('TWEEETS', tweets);
            expect(tweets).to.not.be.empty;
            // console.log('TWEETS', tweets.map(t => t.user));
            expect(tweets).to.be.tweet;
            // console.log('TWEET CONVO IDS', tweets.map(i => i.conversationID))
            expect(tweets.map(t => t.likes)).to.all.be.gte(minLikes);
            return fetchBotHeatchecks()
            .then(res2 => {
                expect([res2, tweets].flat()).to.all.be.tweet;
                console.log('BOT HEATCHECK TWEETS\n-----------------------\n', res2);
                expect(res2).to.all.satisfy(bot => {
                    console.log('BOT ID', bot.conversationID);
                    console.log('TWEETS CONVO IDS', tweets.map(i => i.conversationID));
                    expect(tweets.map(i => i.conversationID)).to.all.not.equal(bot.conversationID);

                    let mentionedUsernames = bot.text.match(/(?<=@)\w+/g) || [];

                    return true;
                });
            });

            // expect(artwork).to.equal();
        });
    });
});
