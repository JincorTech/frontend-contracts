import * as React from 'react';
import { SFC } from 'react';
import EmployeesItem from './EmployeesItem';
import { Employee } from '../../../redux/modules/employmentAgreement/employmentAgreement';

export type Props = {
  employees: Employee[]
  onSelect: (id: string) => void
}

const EmployeesList: SFC<Props> = (props) => {
  const { employees } = props;

  return (
    <div>
      {employees.map((employee) => {
        return <EmployeesItem onSelect={() => { props.onSelect(employee.id) }} key={employee.id} name={employee.name} email={employee.email}/>
      })}
    </div>
  );
};

export default EmployeesList;
