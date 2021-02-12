const cron = require('node-cron')
const heatcheckPayouts = require('./twitter/heatcheckPayouts');

module.exports = () => {
    if(process.env.NODE_ENV !== 'test') {
        // Ten Minutes
        cron.schedule('*/10 * * * *', function() {
            console.log('Making HEAT payouts');
            return heatcheckPayouts();
        });
    }
}

