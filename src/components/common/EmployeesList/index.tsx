import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import EmployeesItem from '../EmployeesItem';

const EmployeesList: SFC<{}> = ({}) => {
  return (
    <div styleName="list">
      <EmployeesItem name={'Maxim Brook'} email={'mbrook@yandex.ru'}/>
      <EmployeesItem name={'Mike Jefferson'} email={'mbrook@yandex.ru'}/>
      <EmployeesItem name={'Claudia Bullock'} email={'mbrook@yandex.ru'}/>
    </div>
  );
};

export default CSSModules(EmployeesList, require('./styles.css'));
