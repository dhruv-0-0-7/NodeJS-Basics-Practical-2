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

function generateDurationMessage(hours) {
    const remainingHours = hours % 24;
    const days = parseInt(hours / 24);

    return `${days ? `${days} day${days === 1 ? '' : 's'} and ` : ''}${remainingHours} Hr${remainingHours === 1 ? '' : 's'}`;
}

module.exports = {
    findNextOpenDay,
    findDiffInHours,
    generateDurationMessage
};