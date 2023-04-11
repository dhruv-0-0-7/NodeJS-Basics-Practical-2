const moment = require('moment');
const SHOP_SCHEDULE = require('./schedule');

const timeFormat = 'hh:mm A';
const now = moment();
const today = now.format('ddd');

const day = SHOP_SCHEDULE.find(day => day.day === today);
let status = 'CLOSED';

if (day) {
    day.open = moment(day.open, timeFormat);
    day.close = moment(day.close, timeFormat);

    if (now.isBetween(day.open, day.close, undefined, '[)'))
        status = 'OPEN';
}

console.log(`OUTPUT: ${status}`);