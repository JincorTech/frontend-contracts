import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import Avatar from '../../../../components/common/Avatar';

export type ComponentProps = {
  avatar?: string
  id: string
  name: string
  email: string
  onSelect: () => void
};

const EmployeesItem: SFC<ComponentProps> = (props) => {
  return (
    <div styleName="item" onClick={props.onSelect}>
      <Avatar styleName="avatar" src={props.avatar} fullName={props.name} id={props.id}/>
      <div styleName="info">
        <div styleName="name">{props.name}</div>
        <div styleName="email">{props.email}</div>
      </div>
    </div>
  );
};

export default CSSModules(EmployeesItem, require('./styles.css'));
