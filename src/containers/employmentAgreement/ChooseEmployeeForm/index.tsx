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
import SelectInput from '../../../components/employmentAgreement/createContractForm/SelectInput';
import ChooseEmployeePopup from '../../../containers/employmentAgreement/ChooseEmployeePopup';

export type Props = StateProps & DispatchProps & ComponentProps;

export type ComponentProps = {
  onNext: () => void
}

export type DispatchProps = {
  fetchEmployees: () => void
  chooseEmployee: (id: string) => void
  openPopup: () => void
  closePopup: () => void
}

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
      chooseEmployee
    } = this.props;
  
    const handleSelect = (id: string) => {
      chooseEmployee(id);
      onNext();
    }

    return (
      <div>
        <div styleName="image"/>
        <span styleName="caption">Hey ya!</span>
        <span styleName="description">
          This is smart contract creation interface. To start creating new contract,
          choose the employee and tap next button.
        </span>
        <SelectInput onButtonClick={() => openPopup()}/>
        <ChooseEmployeePopup open={popupIsOpened} onClose={closePopup} employees={employees} onSelect={handleSelect}/>
      </div>
    );
  }
};

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

