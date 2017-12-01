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
  signContract,
  resetState as resetWizardState
} from '../../../redux/modules/employmentAgreement/employmentAgreement';
import {
  StateMap as FormStateProps,
  change,
  fetchContract,
  fetchWallets,
  resetState as resetFormState
} from '../../../redux/modules/employmentAgreement/createContractForm';
import {
  StateMap as AppStateProps
} from '../../../redux/modules/app/appWrapper';
import { getEmployeeById } from '../../../helpers/common/store';
import { required, minLength, maxLength } from '../../../utils/validators';
import InputCaption from '../../../components/common/InputCaption';
import { EthCurrencyName } from '../../../helpers/common/api';

export type StateProps = CommonStateProps & AppStateProps & { fields: FormStateProps };

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
  fetchWallets: () => void
  resetFormState: () => void
  resetWizardState: () => void
  signContract: (contractId: string) => void
}


class CreateContractForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Check readonly mode
    if (this.props.routeParams) {
      this.props.fetchEmployees();
      this.props.fetchContract(this.props.routeParams.contractId);
    } else {
      this.props.fetchWallets();
    }
  }

  componentWillUnmount() {
    this.props.resetFormState();
    this.props.resetWizardState();
  }

  getContractIdFromRoute() {
    return this.props.routeParams.contractId;
  }

  canEdit() {
    return !this.props.routeParams;
  }

  canSign() {
    return !this.canEdit() && this.props.fields.employeeId === this.props.user.id;
  }

  handleChange(event) {
    this.props.change({ name: event.target.name, value: event.target.value});
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
      waiting,
      signContract
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

    const isWalletsAddressesExists = () => {
      return fields.companyWalletAddress && fields.employeeWalletAddress;
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

    if (!getEmployeeId() || !isWalletsAddressesExists()) {
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
            <WalletInput value={fields.companyWalletAddress} description={'Company wallet address'} />
            <WalletInput value={fields.employeeWalletAddress} description={'Employee wallet address'} />
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
              <Input disabled={!this.canEdit()} name={'salaryAmount'} caption={true} captionText={EthCurrencyName} type="number" max={9999999999} value={fields.salaryAmount} onChange={this.handleChange} styleName="text-input" placeholder={'Salary amount'} />
              <div styleName="salary-input-caption">
                <InputCaption text="Monthly"/>
              </div>
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
            <Button isSubmit={true} disabled={!validateSubmitButton} spinner={waiting} value={'Create smart contract'} />
          </div> : null
        }

        {this.canSign() ?
          <div styleName="create-button">
              <Button spinner={waiting} onClick={() => signContract(this.getContractIdFromRoute())}>Sign</Button>
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
      ...state.app.appWrapper,
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
    resetWizardState,
    fetchWallets,
    signContract
  }
)(StyledComponent);
