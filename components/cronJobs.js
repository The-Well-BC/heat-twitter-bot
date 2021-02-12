const cron = require('node-cron')
const heatcheckPayouts = require('./twitter/heatcheckPayouts');

module.exports = () => {
    if(process.env.NODE_ENV !== 'test') {
        // Ten Minutes
        cron.schedule('*/10 * * * *', function() {
            return heatcheckPayouts();
        });
    }
}

