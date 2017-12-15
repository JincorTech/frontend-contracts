import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import * as moment from 'moment';
import Avatar from '../../common/Avatar';
import UnsignedLabel from '../UnsignedLabel';
import { ContractStatus } from '../../../redux/modules/contracts/contractsPage';

export type ComponentProps = {
  id: string
  userId: string
  userAvatar: string
  userName: string
  date: Date
  status: ContractStatus
};

const ContractsItem: SFC<ComponentProps> = (props) => {
  return (
    <div styleName="item">
    <Link to={`/contracts/app/contract/${props.id}`}>
      <Avatar src={props.userAvatar} fullName={props.userName} id={props.userId}/>
      <div styleName="info">
        <div styleName="name">{props.userName}</div>
        <div styleName="date-container">
        <div styleName="date">{moment(props.date).format('DD/MM/YYYY')}</div>
        { props.status !== ContractStatus.Signed ? <UnsignedLabel/> : null }
        </div>
      </div>
      </Link>
    </div>
  );
};

export default CSSModules(ContractsItem, require('./styles.css'));
