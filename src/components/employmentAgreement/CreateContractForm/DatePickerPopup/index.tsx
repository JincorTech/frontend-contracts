import * as React from 'react';
import { SFC } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import Popup from '../../../common/Popup';

export type Props = DispatchProps & ComponentProps;

export type ComponentProps = {
  open: boolean
  onClose: () => void
  onSelect?: (date: string) => void
  startDate?: Date
  endDate?: Date
  selectedDate?: Date
};

export type DispatchProps = {
};

const DatePickerPopup: SFC<Props> = (props) => {
  const {
    open,
    onClose,
    onSelect,
    startDate,
    endDate,
    selectedDate
  } = props;

  return (
    <Popup
      title=""
      open={open}
      close={onClose}>
      <InfiniteCalendar
        width={400}
        height={600}
        selected={selectedDate || startDate}
        min={startDate || new Date()}
        max={endDate || new Date(2050, 11, 31)}
        minDate={startDate || new Date()}
        maxDate={endDate || new Date(2050, 11, 31)}
        onSelect={onSelect}
        displayOptions={{ showHeader: false }}
      />
    </Popup>
  );
};

export default DatePickerPopup;
