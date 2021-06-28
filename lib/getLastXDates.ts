import moment from 'moment';

export default function getLastXDates(i: number, offset: number = 0) {
    const data: string[] = [];
    for (let index: number = offset; index < i + offset; index++) {
        data.push(moment().subtract(index, 'day').format('YYYY-MM-DD'));
    }
    return data;
}
