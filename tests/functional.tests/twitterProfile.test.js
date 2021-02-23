const chai = require('chai');

const expect = chai.expect;
const request = require('supertest');

const links = require('../../config/links');
const app = require('../../app');

describe('Fetch twitter user details for DEX', function() {
    it('#flaky Fetch multiple users', function() {

        const payload = { usernames: ['Zigyzoe', 'another_testing', 'testing_another'] };

        return request(app).post(links.getTwitterProfiles).send(payload)
        .then(res => {
            expect(res.body).to.have.property('profiles');

            expect(res.body.profiles).to.have.lengthOf(payload.usernames.length);
            expect(res.body.profiles).to.all.have.keys('displayName', 'username', 'id', 'avatar');

            expect(res.body.profiles.map(o => o.username)).to.have.members(['Zigyzoe', 'another_testing', 'testing_another']);
            expect(res.body.profiles.map(o => o.displayName)).to.have.members(['Zigizoe', 'AnotherAccForTestingStuff', 'AnotherBotTestingAccount']);
        });
    });
});
