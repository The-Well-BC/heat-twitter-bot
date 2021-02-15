const chai = require('chai');

const expect = chai.expect;
const request = require('supertest');

const links = require('../../config/links');
const app = require('../../app');

describe('Twitter routes', function() {
    it('Twitter CRC validation', function() {
        this.timeout(3000);

        return request(app).get(links.twitterWebhook + '?crc_token=123456')
        .then(res => {
            expect(res.body).to.have.property('response_token').that.contains.string('sha256=');
        });
    });
});
