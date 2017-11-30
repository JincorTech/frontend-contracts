import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import SelectInput from '../../../components/employmentAgreement/createContractForm/SelectInput';
import Avatar from '../../../components/common/Avatar';
import DateInput from '../../../components/employmentAgreement/createContractForm/DateInput';
import Input from '../../../components/common/Input';
import Caption from '../../../components/employmentAgreement/createContractForm/Caption';
import WalletInput from '../../../components/employmentAgreement/createContractForm/WalletInput';
import RadioGroup from '../../../components/employmentAgreement/createContractForm/RadioGroup';
import Button from '../../../components/common/Button';
import ChooseEmployeePopup from '../ChooseEmployeePopup';
import VerificationPopup from '../../../containers/verification/VerificationPopup';
import Spinner from '../../../components/common/Spinner';
import {
  StateMap as CommonStateProps,
  openPopup,
  closePopup,
  chooseEmployee,
  closeVerifyPopup,
  postContract,
  fetchEmployees,
  resetState as resetWizardState
} from '../../../redux/modules/employmentAgreement/employmentAgreement';
import {
  StateMap as FormStateProps,
  change,
  fetchContract,
  resetState as resetFormState
} from '../../../redux/modules/employmentAgreement/createContractForm';
import { getEmployeeById } from '../../../helpers/common/store';
import { required, minLength, maxLength } from '../../../utils/validators';

export type StateProps = CommonStateProps & { fields: FormStateProps };

export type Props = StateProps & DispatchProps & ComponentProps;

export type RouterParams = {
  routeParams?: {
    contractId: string
  }
}

export type ComponentProps = RouterParams & {
}

export type DispatchProps = {
  openPopup: () => void
  closePopup: () => void
  chooseEmployee: (id: string) => void
  postContract: (contractBody: any) => void
  closeVerifyPopup: () => void
  verifyContract: () => void
  change: (payload: { name: string, value: string }) => void
  fetchEmployees: () => void
  fetchContract: (contractId: string) => void
  resetFormState: () => void
  resetWizardState: () => void
}


class CreateContractForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.routeParams) {
      this.props.fetchEmployees();
      this.props.fetchContract(this.props.routeParams.contractId);
    }
  }

  componentWillUnmount() {
    this.props.resetFormState();
    this.props.resetWizardState();
  }

  canEdit() {
    return !this.props.routeParams;
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    if (target.type === 'number' && value !== '' && (+value > +target.max || (target.min && +value < +target.min) || !parseFloat(value))) {
      return;
    }

    this.props.change({ name: name, value: value});
  }

  handleSubmit(event) {
    const contract = { ...this.props.fields, employeeId: this.props.chosenEmployeeId };
    this.props.postContract(contract);
    event.preventDefault();
  }

  render() {
    const {
      employees,
      popupIsOpened,
      verifyPopupIsOpened,
      openPopup,
      closePopup,
      chosenEmployeeId,
      chooseEmployee,
      postContract,
      closeVerifyPopup,
      verifyContract,
      fields,
      contractId,
      contractPosting
    } = this.props;

    const getEmployeeId = () => {
      return chosenEmployeeId || fields.employeeId;
    }

    const getEmployeeName = () => {
      const employeeId = getEmployeeId();
      const employee = getEmployeeById(employees, employeeId);
      if (!employee) {
        return '';
      }

      return employee.name;
    }

    const getFilledStyle = (step: number) => {
      if (fields.isSignedByEmployee) {
        return 'signed-item';
      }

      return stepsValidationResult[step] ? 'filled-item' : '';
    }

    const getSignCaption = () => {
      return fields.isSignedByEmployee ? `Signed by ${getEmployeeName()}`: 'Unsigned';
    }

    // Validation

    const defaultValidate = (value) => value && value !== '';

    const validateAgreementPeriod = () => {
      return !!(periodIsPermanent() || (fields.startAgreementDate && fields.endAgreementDate));
    }

    const validateCompensation = () => {
      return !!(fields.salaryAmount && fields.paymentsDay);
    }

    const periodIsPermanent = () => fields.agreementPeriod === "permanent";

    const stepsValidationResult: boolean[] = [
      defaultValidate(fields.contractDate),
      defaultValidate(fields.contractNumber),
      true,
      defaultValidate(fields.jobTitle),
      true,
      validateAgreementPeriod(),
      validateCompensation(),
      true,
      false
    ];

    const validateSubmitButton = stepsValidationResult.slice(0, -1).every((value) => value);

    // Render

    if (!getEmployeeId()) {
      return <div styleName="spinner"><Spinner/></div>;
    }

    return (
      <form onSubmit={this.handleSubmit} styleName="form">
        <div styleName="avatar">
          <Avatar src={null} fullName={getEmployeeName()} id={getEmployeeId()} />
        </div>
        <div styleName="input">
          <SelectInput disabled={!this.canEdit()} text={getEmployeeName()} onButtonClick={openPopup}/>
        </div>
        <ol styleName="list">
          <li styleName={getFilledStyle(0)}>
            <DateInput disabled={!this.canEdit()} name={'contractDate'} value={fields.contractDate} onChange={this.handleChange} description={'Contract date'} buttonText={'Pick date'} />
          </li>
          <li styleName={getFilledStyle(1)}>
            <Input disabled={!this.canEdit()} name={'contractNumber'} caption={true} type="number" max={999999} value={fields.contractNumber} onChange={this.handleChange} styleName="text-input" placeholder={'Contract number'} />
          </li>
          <li styleName={getFilledStyle(2)}>
            <Caption text={'Wallets'} />
            <WalletInput value={'0x29D7d1d865…86B'} description={'Company wallet address'} />
            <WalletInput value={'0x32D9d1v909…91F'} description={'Employee wallet address'} />
            <div styleName="wallets-spacer" />
          </li>
          <li styleName={getFilledStyle(3)}>
            <div styleName="job-text-input-container">
              <Input disabled={!this.canEdit()} name={'jobTitle'} value={fields.jobTitle} maxLength={100} onChange={this.handleChange} styleName="text-input" placeholder={'Job title'} />
            </div>
            <Input disabled={!this.canEdit()} name={'roleDescription'} value={fields.roleDescription} maxLength={100} onChange={this.handleChange} styleName="small-text-input" placeholder={'Role desription'} />
          </li>
          <li styleName={getFilledStyle(4)}>
            <Caption text={'Type of employment'} />
            <RadioGroup disabled={!this.canEdit()} name={'employmentType'} value={fields.employmentType} onChange={this.handleChange} groupId={'type-of-employment'} values={['full', 'part']} labels={['Full time', 'Part time']} />
            <div styleName="spacer" />
          </li>
          <li styleName={getFilledStyle(5)}>
            <Caption text={'Period of agreement'} />
            <div styleName="period-radio-group">
              <RadioGroup disabled={!this.canEdit()} name={'agreementPeriod'} value={fields.agreementPeriod} onChange={this.handleChange} groupId={'period-of-agreement'} values={['fixed', 'permanent']} labels={['Fixed period', 'Permanent agreement']} />
            </div>
            <div styleName="spacer" />
            <div styleName="period-dates">
              <DateInput disabled={periodIsPermanent() || !this.canEdit()} name={'startAgreementDate'} value={fields.startAgreementDate} onChange={this.handleChange} description={'Start date'} buttonText={'Pick start date'} />
              <DateInput disabled={periodIsPermanent() || !this.canEdit()} name={'endAgreementDate'} value={fields.endAgreementDate} onChange={this.handleChange} description={'End date'} buttonText={'Pick end date'} />
            </div>
            <div styleName="spacer" />
          </li>
          <li styleName={getFilledStyle(6)}>
            <Caption text={'Compensation'} />
            <div styleName="salary-text-input-container">
              <Input disabled={!this.canEdit()} name={'salaryAmount'} type="number" max={9999999999} value={fields.salaryAmount} onChange={this.handleChange} styleName="text-input" placeholder={'Salary amount'} />
            </div>
            <Input disabled={!this.canEdit()} name={'paymentsDay'} caption={true} type="number" min={1} max={31} value={fields.paymentsDay} onChange={this.handleChange} styleName="text-input" placeholder={'Day of payments'} />
          </li>
          <li styleName={getFilledStyle(7)}>
            <Caption text={'Additional сlauses'} />
            <Input disabled={!this.canEdit()} name={'additionalClauses'} value={fields.additionalClauses} maxLength={100} onChange={this.handleChange} styleName="small-text-input" placeholder={'Place for additional text'} />
          </li>
          <li styleName={getFilledStyle(8)}>
            <Caption text={'Signatures'} />
            <span styleName="section-description">To sign contract you need to request code from Google Authentificator. After your signing request for the signing of the contract will be sent to your employee.</span>
            
            {fields.isSignedByEmployee ?
              <img styleName="signed-icon" src={require('../../../assets/images/signed.svg')}/> : null
            }
            
            <span styleName="sign-status">{getSignCaption()}</span>
            <span styleName="sign-description">Employer signature</span>
          </li>
        </ol>

        {this.canEdit() ?
          <div styleName="create-button">
            <Button isSubmit={true} disabled={!validateSubmitButton} spinner={contractPosting} value={'Create smart contract'} />
          </div> : null
        }

        <ChooseEmployeePopup open={popupIsOpened} onClose={closePopup} employees={employees} onSelect={chooseEmployee}/>
        <VerificationPopup isOpen={verifyPopupIsOpened} onClose={closeVerifyPopup} contractId={contractId}/>
      </form>
    );
  }
}

const StyledComponent = CSSModules(CreateContractForm, require('./styles.css'));

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => {
    return {
      ...state.employmentAgreement.employmentAgreement,
      fields: state.employmentAgreement.createContractForm
    }
  },
  {
    openPopup,
    closePopup,
    chooseEmployee,
    closeVerifyPopup,
    postContract,
    change,
    fetchEmployees,
    fetchContract,
    resetFormState,
    resetWizardState
  }
)(StyledComponent);
