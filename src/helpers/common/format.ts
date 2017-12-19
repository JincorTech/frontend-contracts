import * as moment from 'moment';

export const printDate = (date: Date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const isNumeric = (n: string) => {
  return !isNaN(parseFloat(n)) && isFinite(+n);
};

export const isInteger = (n: string) => {
  return isNumeric(n) && !n.includes('.'); 
}
