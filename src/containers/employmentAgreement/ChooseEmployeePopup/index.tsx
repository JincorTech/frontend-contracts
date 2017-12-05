import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { SFC } from 'react';
import { connect } from 'react-redux';
import Popup from '../../../components/common/Popup';
import Input from '../../../components/common/Input';
import EmployeesList from '../../../components/employmentAgreement/EmployeesList';
import { Employee } from '../../../redux/modules/employmentAgreement/employmentAgreement';
import { StateMap as StateProps, changeSearchText } from '../../../redux/modules/employmentAgreement/chooseEmployeePopup';

export type Props = StateProps & DispatchProps & ComponentProps;

export type ComponentProps = {
  open: boolean
  onClose: () => void
  employees: Employee[]
  onSelect: (id: string) => void
};

export type DispatchProps = {
  changeSearchText: (text: string) => void
};

const ChooseEmployeePopup: SFC<Props> = (props) => {
  const {
    open,
    onClose,
    employees,
    onSelect,
    searchText,
    changeSearchText
  } = props;

  const handleChangeSearchText = (e) => {
    changeSearchText(e.target.value);
  };

  const getFilteredEmployees = () => {
    return employees.filter((employee) => {
      return employee.name.toUpperCase().includes(searchText.toUpperCase())
              || employee.email.toUpperCase().includes(searchText.toUpperCase());
    });
  };

  return (
    <Popup
      title=""
      open={open}
      close={onClose}>
      <div>
        <Input styleName="input" placeholder="Search" value={searchText} onChange={handleChangeSearchText}/>
        <div styleName="header">
          Employees
        </div>
        <EmployeesList employees={getFilteredEmployees()} onSelect={onSelect}/>
      </div>
    </Popup>
  );
};

const StyledComponent = CSSModules(ChooseEmployeePopup, require('./styles.css'));

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.employmentAgreement.chooseEmployeePopup,
  {
    changeSearchText
  }
)(StyledComponent);
