import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { StateMap as StateProps, nextStep, Step } from '../../../redux/modules/wizard/employmentAgreementWizard';

import ContractTypesForm from '../../../components/wizard/ContractTypesForm';
import ChooseEmployeeForm from '../../../containers/employmentAgreement/ChooseEmployeeForm';
import CreateContractForm from '../../../containers/employmentAgreement/CreateContractForm';

/**
 * Types
 */
export type Props = StateProps & DispatchProps;

export type DispatchProps = {
  nextStep: () => void
};

/**
 * Component
 */
class EmploymentAgreementWizard extends Component<Props, {}> {
  public render() {
    const {
      currentStep,
      nextStep
    } = this.props;
    switch (currentStep) {
      case Step.ChooseContractType:
        return <ContractTypesForm onNext={nextStep}/>;
      case Step.ChooseEmployeeForm:
        return <ChooseEmployeeForm onNext={nextStep}/>;
      case Step.CreateContractForm:
        return <CreateContractForm/>;
      default:
        return <div/>;
    }
  }
}

/**
 * Export
 */
const styledComponent = CSSModules(EmploymentAgreementWizard, require('./styles.css'));

export default connect<StateProps, DispatchProps, Props>(
  (state) => state.wizard.employmentAgreementWizard,
  {
    nextStep
  }
)(styledComponent);
