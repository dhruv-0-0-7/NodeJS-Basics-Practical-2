const moment = require('moment');
const SHOP_SCHEDULE = require('./schedule');
const { findDiffInHours, findNextOpenDay, generateDurationMessage } = require('./utils');

const timeFormat = 'hh:mm A';
const now = moment();
const today = now.format('ddd');

let day = SHOP_SCHEDULE.find(day => day.day === today);
let statusMessage = {
    status: null,
    conjunction: null,
    duration: null
};

if (!day) {
    const hours = findDiffInHours(findNextOpenDay(now), now);
    statusMessage.status = 'CLOSED';
    statusMessage.conjunction = 'open after';
    statusMessage.duration = generateDurationMessage(hours);
} else {
    day.open = moment(day.open, timeFormat);
    day.close = moment(day.close, timeFormat);
    let hours = 0;

    if (now.isBetween(day.open, day.close, undefined, '[)')) {
        hours = Math.ceil(moment(day.close, timeFormat).diff(now, 'hours', true));
        statusMessage.status = 'OPEN';
        statusMessage.conjunction = 'be closed within';
    }
    else if (now.isBefore(day.open)) {
        hours = findDiffInHours(day, now);
        statusMessage.status = 'CLOSED';
        statusMessage.conjunction = 'open after';
    }
    else {
        hours = findDiffInHours(findNextOpenDay(now), now);
        statusMessage.status = 'CLOSED';
        statusMessage.conjunction = 'open after';
    }
    statusMessage.duration = generateDurationMessage(hours);
}

console.log(`${statusMessage.status}. The shop will ${statusMessage.conjunction} ${statusMessage.duration}.`);
