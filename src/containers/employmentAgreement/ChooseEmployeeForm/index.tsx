import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {
  StateMap as StateProps,
  openPopup,
  closePopup,
  fetchEmployees,
  chooseEmployee
} from '../../../redux/modules/employmentAgreement/employmentAgreement';
import SelectInput from '../../../components/employmentAgreement/CreateContractForm/SelectInput';
import ChooseEmployeePopup from '../../../containers/employmentAgreement/ChooseEmployeePopup';
import { getEmployeeById } from '../../../helpers/common/store';

export type Props = StateProps & DispatchProps & ComponentProps;

export type ComponentProps = {
  onNext: () => void
};

export type DispatchProps = {
  fetchEmployees: () => void
  chooseEmployee: (id: string) => void
  openPopup: () => void
  closePopup: () => void
};

class ChooseEmployeeForm extends Component<Props, {}> {
  componentDidMount() {
    this.props.fetchEmployees();
  }

  render() {
    const {
      popupIsOpened,
      openPopup,
      closePopup,
      onNext,
      employees,
      employeesWaiting,
      chooseEmployee,
      chosenEmployeeId
    } = this.props;

    const handleSelect = (id: string) => {
      chooseEmployee(id);
      onNext();
    };

    const chosenEmployee = employees && getEmployeeById(employees, chosenEmployeeId);

    return (
      <div>
        <img styleName="image" src={require('../../../assets/images/smart.png')}/>
        <span styleName="caption">Hey ya!</span>
        <span styleName="description">
          This is smart contract creation interface. To start creating new contract,
          choose the employee and tap next button.
        </span>
        <SelectInput text={chosenEmployee ? chosenEmployee.name : ''} onButtonClick={() => openPopup()}/>
        <ChooseEmployeePopup open={popupIsOpened} onClose={closePopup} employees={employees} spinner={employeesWaiting} onSelect={handleSelect}/>
      </div>
    );
  }
}

const StyledComponent = CSSModules(ChooseEmployeeForm, require('./styles.css'));

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.employmentAgreement.employmentAgreement,
  {
    openPopup,
    closePopup,
    fetchEmployees,
    chooseEmployee
  }
)(StyledComponent);
