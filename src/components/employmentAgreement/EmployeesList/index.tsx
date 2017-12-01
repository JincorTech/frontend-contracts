import * as React from 'react';
import { SFC } from 'react';
import EmployeesItem from './EmployeesItem';
import * as CSSModules from 'react-css-modules';
import { Employee } from '../../../redux/modules/employmentAgreement/employmentAgreement';

export type Props = {
  employees: Employee[]
  onSelect: (id: string) => void
}

const EmployeesList: SFC<Props> = (props) => {
  const { employees } = props;

  return (
    <div styleName="list">
      {employees.map((employee) => {
        return <EmployeesItem onSelect={() => { props.onSelect(employee.id) }}
                    key={employee.id} id={employee.id} name={employee.name} email={employee.email} avatar={employee.avatar}/>
      })}
    </div>
  );
};

const StyledComponent = CSSModules(EmployeesList, require('./styles.css'));

export default StyledComponent;
