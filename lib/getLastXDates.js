import moment from 'moment';

export default function getLastXDates(i) {
    return [...Array(i).keys()].map(i => moment().subtract(i, 'day').format('YYYY-MM-DD'));
}
