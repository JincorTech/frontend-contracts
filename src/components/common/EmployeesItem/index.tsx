import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import Avatar from '../Avatar';

export type ComponentProps = {
  name: string
  email: string
};

const EmployeesItem: SFC<ComponentProps> = (props) => {
  return (
    <div styleName="item">
      <Avatar styleName="avatar" src={null} fullName={props.name} id={'4a516c0a-2c02-4a9f-9e2a-da6bc5ecf577'}/>
      <div styleName="info">
        <div styleName="name">{props.name}</div>
        <div styleName="email">{props.email}</div>
      </div>
    </div>
  );
};

export default CSSModules(EmployeesItem, require('./styles.css'));
