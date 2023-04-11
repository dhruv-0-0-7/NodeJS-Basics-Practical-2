const moment = require('moment');
const SHOP_SCHEDULE = require('./schedule');

function findNextOpenDay(now) {
    return SHOP_SCHEDULE.find(day => moment(day.day, 'ddd').isAfter(now, 'days'));
}

function findDiffInHours(day, now) {
    const timeFormat = 'hh:mm A';
    if (moment.isMoment(day.open)) day.open = day.open.format(timeFormat);
    if (moment.isMoment(day.close)) day.close = day.close.format(timeFormat);

    return moment(`${day.day} ${day.open}`, 'ddd hh:mm A').diff(now, 'hours', true);
}

module.exports = {
    findNextOpenDay,
    findDiffInHours
};