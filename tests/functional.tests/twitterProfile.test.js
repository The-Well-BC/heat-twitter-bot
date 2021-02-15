const chai = require('chai');

const expect = chai.expect;
const request = require('supertest');

const links = require('../../config/links');
const app = require('../../app');

describe('#dev Fetch twitter user details for DEX', function() {
    it('#flaky Fetch multiple users', function() {

        const payload = { usernames: ['Zigyzoe', 'another_testing'] };

        return request(app).post(links.getTwitterProfiles).send(payload)
        .then(res => {
            console.log('RES BODY', res.body);

            expect(res.body).to.have.property('profiles');

            expect(res.body.profiles).to.have.lengthOf(payload.length);
            expect(res.body.profiles).to.all.have.keys('displayName', 'username', 'avatar');

            expect(res.body.profiles.map(o => o.username)).to.have.members(['Zigyzoe', 'AnotherBotTestingAccount']);
        });
    });
});
