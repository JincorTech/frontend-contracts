import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { SFC } from 'react';
import { connect } from 'react-redux';
import Popup from '../../../components/common/Popup';
import Input from '../../../components/common/Input';
import EmployeesList from '../../../components/employmentAgreement/EmployeesList';
import { Employee } from '../../../redux/modules/employmentAgreement/employmentAgreement';

export type Props = {
  open: boolean
  onClose: () => void
  employees: Employee[]
  onSelect: (id: string) => void
}

const ChooseEmployeePopup: SFC<Props> = (props) => {
  const {
    open,
    onClose,
    employees,
    onSelect
  } = props;

  return (
    <Popup
      title=""
      open={open}
      close={onClose}>
      <div>
        <Input styleName="input" placeholder="Search"/>
        <div styleName="header">
          Employees
        </div>
        <EmployeesList employees={employees} onSelect={onSelect}/>
      </div>
    </Popup>
  );
};

export default CSSModules(ChooseEmployeePopup, require('./styles.css'));