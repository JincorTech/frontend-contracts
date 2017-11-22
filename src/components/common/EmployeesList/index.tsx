import * as React from 'react';
import { SFC } from 'react';
import EmployeesItem from './EmployeesItem';

const EmployeesList: SFC<{}> = ({}) => {
  return (
    <div>
      <EmployeesItem name={'Maxim Brook'} email={'mbrook@yandex.ru'}/>
      <EmployeesItem name={'Mike Jefferson'} email={'mbrook@yandex.ru'}/>
      <EmployeesItem name={'Claudia Bullock'} email={'mbrook@yandex.ru'}/>
    </div>
  );
};

export default EmployeesList;
