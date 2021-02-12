const cron = require('node-cron')
const heatcheckPayouts = require('./twitter/heatcheckPayouts');

module.exports = () => {
    if(process.env.NODE_ENV !== 'test') {
        // Five Minutes
        cron.schedule('*/5 * * * *', function() {
            console.log('Making HEAT payouts');
            return heatcheckPayouts();
        });
    }
}

