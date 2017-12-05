import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import Avatar from '../../common/Avatar';
import * as moment from 'moment';

export type ComponentProps = {
  id: string
  userId: string
  userAvatar: string
  userName: string
  date: Date
};

const ContractsItem: SFC<ComponentProps> = (props) => {
  return (
    <div styleName="item">
    <Link to={`/ctr/app/contract/${props.id}`}>
      <Avatar src={props.userAvatar} fullName={props.userName} id={props.userId}/>
      <div styleName="info">
        <div styleName="name">{props.userName}</div>
        <div styleName="date">{moment(props.date).format('DD/MM/YYYY')}</div>
      </div>
      </Link>
    </div>
  );
};

export default CSSModules(ContractsItem, require('./styles.css'));
