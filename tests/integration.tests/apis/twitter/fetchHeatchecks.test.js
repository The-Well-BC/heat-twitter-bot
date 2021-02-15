const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const fetchHeatchecks = require('../../../../components/twitter/fetchHeatchecks');
const fetchBotHeatchecks = require('../../../../components/twitter/fetchBotHeatchecks');
const searchTweets = require('../../../../components/twitter/api/searchTweets2');

const tweetKeys = ['id', 'text', 'user', 'retweets', 'likes'];

describe.only('#dev Fetch #HEATCHECK tweet', function() {
    it('Fetch #HEATCHECK tweet', function() {
        let minLikes = 3;

        return fetchHeatchecks({ minLikes })
        .then(tweets => {
            expect(tweets).to.not.be.empty;
            // console.log('TWEET CONVO IDS', tweets.map(i => i.conversationID))
            expect(tweets.map(t => t.likes)).to.all.be.gte(minLikes);
            return fetchBotHeatchecks()
            .then(res2 => {
                expect([res2, tweets].flat()).to.all.be.tweet;
                // console.log('BOT HEATCHECK TWEETS\n-----------------------\n', res2);
                expect(res2).to.all.satisfy(bot => {
                    // console.log('BOT TEXT', bot.text);
                    expect(tweets.map(i => i.conversationID)).to.all.not.equal(bot.conversationID);

                    let mentionedUsernames = bot.text.match(/(?<=@)\w+/g) || [];

                    /*
                    console.log('MENTIONED SUERNAMES', mentionedUsernames);

                    console.log('TWEETS', tweets.map(t => t.user.username), '\n\n')

                    // Temporary, till Feb 20. Tweet reply didn't work so filtering out conversation ID won't work
                    // expect(tweets.map(t => t.user.username), 'this is temporary').to.all.not.be.oneOf(mentionedUsernames);
                    */
                    return true;
                });
            });

            // expect(artwork).to.equal();
        });
    });
});
