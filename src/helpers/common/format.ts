import * as moment from 'moment';

const pad = (n: number) => (n < 10) ? ('0' + n) : n;

export const printDate = (date: Date) => {
  return moment(date).format('DD/MM/YYYY');
};