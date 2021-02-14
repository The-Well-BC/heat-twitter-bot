let chai = require('chai');
chai.use( require('chai-things') );
chai.use( require('./customAsserts/tweetObj.assert') );

exports.mochaHooks = {
    beforeAll() {
        console.log('Starting Tests...');
    }
}
