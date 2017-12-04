import * as moment from 'moment';

export const printDate = (date: Date) => {
  return moment(date).format('DD/MM/YYYY');
};
