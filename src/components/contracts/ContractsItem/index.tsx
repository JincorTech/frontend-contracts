import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import Avatar from '../../common/Avatar';
import * as moment from 'moment';

export type ComponentProps = {
  name: string
  date: Date
};

const ContractsItem: SFC<ComponentProps> = (props) => {
  return (
    <div styleName="item">
      <Avatar src={null} fullName={props.name} id={'4a516c0a-2c02-4a9f-9e2a-da6bc5ecf577'}/>
      <div styleName="info">
        <div styleName="name">{props.name}</div>
        <div styleName="date">{moment(props.date).format('DD/MM/YYYY')}</div>
      </div>
    </div>
  );
};

export default CSSModules(ContractsItem, require('./styles.css'));
