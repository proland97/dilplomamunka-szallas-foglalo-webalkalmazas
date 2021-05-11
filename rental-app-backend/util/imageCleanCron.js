const CronJob = require('cron').CronJob;

const job = new CronJob('0 * * * *', () => {
    console.log('You will see this message every hour');
}, null, true);

module.exports = job