import moment from 'moment';

export const API_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss[Z]';

const API_TIME_FORMAT = 'HH:mm:ss.SSS';


const DATE_TIME_FORMAT = 'DD/MM/YYYY hh:mm A';

const HOUR_FORMAT = 'hh:mm A';

const DATE_FORMAT_VIEW = 'DD/MM/YYYY';

export function convertToLocal(utcDate, format) {
    return utcDate && moment(utcDate).format(format || DATE_TIME_FORMAT);
}

export function convertToUTC(localDate, format) {
    return localDate ? moment.utc(moment(localDate, format || DATE_TIME_FORMAT)).format(API_DATE_TIME_FORMAT) : null;
}

export function convertToLocalDate(utcDate, format) {
    return utcDate && moment(utcDate).format(format || DATE_FORMAT_VIEW);
}

export function convertToLocalTime(utcDate, format) {
    return utcDate && moment(utcDate).format(format || HOUR_FORMAT);
}

export function convertToUTCTime(localTime) {
    return localTime ? moment.utc(moment(localTime, HOUR_FORMAT)).format(API_TIME_FORMAT) : null;
}

export function toAPITimeFormat(localTime) {
    return localTime ? moment(localTime, HOUR_FORMAT).format(API_TIME_FORMAT) : null;
}

export function toLocalTimeFormat(time) {
    return time ? moment(time, API_TIME_FORMAT).format(HOUR_FORMAT) : null;
}

export function convertTimeStringToLocalTime(time) {
    return time ? moment(time + 'Z', API_TIME_FORMAT + 'Z').format(HOUR_FORMAT) : null;
}

export function getViewFormattedDate(date) {
    return date && moment(date).format(DATE_FORMAT_VIEW);
}

export function formatDate(date, format) {
    return date && moment(date).format(format);
}

export function formatUTCDateAndTime(date, time, format) {
    return date && time ? moment(
        moment.utc(
            moment(date).format(DATE_FORMAT_VIEW) + ' ' + moment(time, HOUR_FORMAT).format(HOUR_FORMAT),
            `${DATE_FORMAT_VIEW} ${HOUR_FORMAT}`))
        .format(format) : null;
}

export function formatDateAndTimeToUTC({ date = {}, time = {}, format } = {}) {
    let dateValue = date.value;
    let dateFormat = date.format || DATE_FORMAT_VIEW;
    let timeValue = time.value;
    let timeFormat = time.format || HOUR_FORMAT;
    return dateValue && timeValue ?
        moment.utc(
            moment(`${dateValue} ${timeValue}`, `${dateFormat} ${timeFormat}`)).format(format) : null;
}

export function getDurationInMinutes(endTime, startTime = moment.utc().format()) {
    let duration = moment.duration(moment(endTime).diff(moment(startTime)));
    return parseInt((duration && duration.asMinutes()) || 0);
}

export function getYear() {
    return moment().year();
}

export function getMonthName(month, inputMonthFormat, outputNameFormat) {
    return moment(month, inputMonthFormat).format(outputNameFormat);
}

export function getMonthDateRange(year, month) {
    // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
    // array is 'year', 'month', 'day', etc
    let startDate = moment([year, month - 1]);

    // Clone the value before .endOf()
    let endDate = moment(startDate).endOf('month');

    // Format dates
    startDate = startDate.format(DATE_TIME_FORMAT);
    endDate = endDate.format(DATE_TIME_FORMAT);

    // make sure to call toDate() for plain JavaScript date type
    return { startDate, endDate };
}
