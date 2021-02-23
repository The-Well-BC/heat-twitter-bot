const chai = require('chai');
chai.use( require('chai-things') );
const expect = chai.expect;

const searchUser = require('../../../../components/twitter/api/searchUsers');

const userKeys = ['username', 'id', 'avatar', 'displayName'];

describe('Twitter API - fetch user', function() {
    it('#flaky Fetch User', function() {

        // Flaky because tweet might be deleted.
        let username = 'testing_another';

        return searchUser(username)
        .then(res => {
            expect(res).to.have.lengthOf(1);

            expect(res).to.all.have.property('displayName', 'AnotherBotTestingAccount');
            expect(res).to.all.have.keys(userKeys);

            expect(res[0].username).to.equal(username);
        });
    });
});
