import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import * as moment from 'moment';
import SelectInput from '../../../components/employmentAgreement/CreateContractForm/SelectInput';
import Avatar from '../../../components/common/Avatar';
import DateInput from '../../../components/employmentAgreement/CreateContractForm/DateInput';
import Input from '../../../components/common/Input';
import Caption from '../../../components/employmentAgreement/CreateContractForm/Caption';
import WalletInput from '../../../components/employmentAgreement/CreateContractForm/WalletInput';
import RadioGroup from '../../../components/employmentAgreement/CreateContractForm/RadioGroup';
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
  openDatePopup,
  closeDatePopup,
  FormDates,
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
import InputCaption from '../../../components/common/InputCaption';
import {
  EthCurrencyName,
  AppDateFormat,
  PermanentAgreementPeriodType,
  FixedAgreementPeriodType
} from '../../../helpers/common/api';
import DatePickerPopup from '../../../components/employmentAgreement/CreateContractForm/DatePickerPopup';
import { parseAppDate } from '../../../helpers/common/api';
import { VerifyType } from '../../../redux/modules/verification/verification';
import { ContractStatus } from '../../../redux/modules/contracts/contractsPage';

export type StateProps = CommonStateProps & AppStateProps & { fields: FormStateProps };

export type Props = StateProps & DispatchProps & ComponentProps;

export type RouterParams = {
  routeParams?: {
    contractId: string
  }
};

export type ComponentProps = RouterParams & {
};

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
  openDatePopup: (popup: FormDates) => void
  closeDatePopup: () => void
};

class CreateContractForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
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

  componentWillReceiveProps(nextProps) {
    if (this.props.chosenEmployeeId !== nextProps.chosenEmployeeId) {
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
    return !this.canEdit()
      && this.props.fields.employeeId === this.props.user.id
      && this.props.fields.status === ContractStatus.Deployed;
  }

  getVerifyType() {
    return this.canSign() ? VerifyType.SignContract : VerifyType.DeployContract;
  }

  handleChange(event) {
    this.props.change({ name: event.target.name, value: event.target.value});
  }

  handleSubmit(event) {
    const contract = { ...this.props.fields, employeeId: this.props.chosenEmployeeId };
    this.props.postContract(contract);
    event.preventDefault();
  }

  getActiveDateInputName() {
    switch (this.props.activeDatePopup) {
      case FormDates.ContractDate: return 'contractDate';
      case FormDates.StartDate: return 'startAgreementDate';
      case FormDates.EndDate: return 'endAgreementDate';
    }
  }

  handleDateSelect(date) {
    const inputName = this.getActiveDateInputName();

    this.props.change({name: inputName, value: moment(date).format(AppDateFormat)});
    this.props.closeDatePopup();
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
      closeVerifyPopup,
      fields,
      contractId,
      waiting,
      signContract,
      openDatePopup,
      closeDatePopup,
      activeDatePopup,
      employeesWaiting
    } = this.props;

    const getEmployeeId = () => {
      return chosenEmployeeId || fields.employeeId;
    };

    const getEmployee = () => {
      const employeeId = getEmployeeId();
      return getEmployeeById(employees, employeeId);
    };

    const getEmployeeName = () => {
      const employee = getEmployee();
      if (!employee) {
        return '';
      }

      return employee.name;
    };

    const getEmployeeAvatar = () => {
      const employee = getEmployee();
      if (!employee) {
        return null;
      }

      return employee.avatar;
    };

    const isWalletsAddressesExists = () => {
      return fields.companyWalletAddress && fields.employeeWalletAddress;
    };

    // Validation

    const getMinDate = () => {
      switch (activeDatePopup) {
        case FormDates.ContractDate: return '';
        case FormDates.StartDate: return fields.contractDate;
        case FormDates.EndDate: return fields.startAgreementDate !== '' ? fields.startAgreementDate : fields.contractDate;
        default: return '';
      }
    };

    const getMaxDate = () => {
      switch (activeDatePopup) {
        case FormDates.ContractDate: return fields.startAgreementDate !== '' ? fields.startAgreementDate : fields.endAgreementDate;
        case FormDates.StartDate: return fields.endAgreementDate;
        case FormDates.EndDate: return '';
        default: return '';
      }
    };

    const defaultValidate = (value) => value && value !== '';
    const periodIsPermanent = () => fields.agreementPeriod === PermanentAgreementPeriodType;

    const validateAgreementPeriod = () => {
      return !!(periodIsPermanent() || (fields.startAgreementDate && fields.endAgreementDate));
    };

    const validateCompensation = () => {
      return !!(fields.salaryAmount && fields.paymentsDay);
    };

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

    const getFilledStyle = (step: number) => {
      if (fields.isSignedByEmployee) {
        return 'signed-item';
      }

      return stepsValidationResult[step] ? 'filled-item' : '';
    };

    const getSignCaption = () => {
      switch (fields.status) {
        case ContractStatus.Draft: return 'Draft';
        case ContractStatus.Deployed: return 'Unsigned';
        case ContractStatus.DeployPending: return 'Deploy pending...';
        case ContractStatus.DeployFailed: return 'Deploy failed';
        case ContractStatus.Signed: return `Signed by ${getEmployeeName()}`;
        case ContractStatus.SignPending: return 'Sign pending...';
        case ContractStatus.SignFailed: return 'Sign failed';
        default: return '';
      }
    };

    if (!getEmployee() || !isWalletsAddressesExists()) {
      return <div styleName="spinner"><Spinner/></div>;
    }

    return (
      <form onSubmit={this.handleSubmit} styleName="form">
        <div styleName="avatar">
          <Avatar src={getEmployeeAvatar()} fullName={getEmployeeName()} id={getEmployeeId()} />
        </div>
        <div styleName="input">
          <SelectInput disabled={!this.canEdit()} text={getEmployeeName()} onButtonClick={openPopup}/>
        </div>
        <ol styleName="list">
          <li styleName={getFilledStyle(0)}>
            <DateInput disabled={!this.canEdit()} name={'contractDate'} caption={true} value={fields.contractDate} onClick={() => openDatePopup(FormDates.ContractDate)} description={'Contract date'} buttonText={'Pick date'} />
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
              <RadioGroup disabled={!this.canEdit()} name={'agreementPeriod'} value={fields.agreementPeriod} onChange={this.handleChange} groupId={'period-of-agreement'} values={[FixedAgreementPeriodType, PermanentAgreementPeriodType]} labels={['Fixed period', 'Permanent agreement']} />
            </div>
            <div styleName="spacer" />
            {!periodIsPermanent() ?
              <div styleName="period-dates">
                <DateInput disabled={!this.canEdit()} name={'startAgreementDate'} value={fields.startAgreementDate} onClick={() => openDatePopup(FormDates.StartDate)} description={'Start date'} buttonText={'Pick start date'} />
                <DateInput disabled={!this.canEdit()} name={'endAgreementDate'} value={fields.endAgreementDate} onClick={() => openDatePopup(FormDates.EndDate)} description={'End date'} buttonText={'Pick end date'} />
              </div> : null}
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
            {this.canEdit() || fields.additionalClauses !== ''
              ? <Input disabled={!this.canEdit()} name={'additionalClauses'} value={fields.additionalClauses} maxLength={100} onChange={this.handleChange} styleName="small-text-input" placeholder={'Place for additional text'} />
              : null
            }
          </li>
          <li styleName={getFilledStyle(8)}>
            <Caption text={'Signatures'} />
            <span styleName="section-description">To sign contract you need to request code from Google Authentificator. After your signing request for the signing of the contract will be sent to your employee.</span>

            {fields.status === ContractStatus.Signed ?
              <img styleName="signed-icon" src={require('../../../assets/images/signed.svg')}/> : null
            }

            <span styleName="sign-status">{getSignCaption()}</span>
            <span styleName="sign-description">Contract status</span>
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

        <ChooseEmployeePopup open={popupIsOpened} onClose={closePopup} employees={employees} spinner={employeesWaiting} onSelect={chooseEmployee}/>
        <VerificationPopup isOpen={verifyPopupIsOpened} onClose={closeVerifyPopup} contractId={contractId} type={this.getVerifyType()}/>
        <DatePickerPopup open={activeDatePopup !== null} onClose={closeDatePopup} onSelect={this.handleDateSelect} startDate={parseAppDate(getMinDate())} endDate={parseAppDate(getMaxDate())}/>
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
    };
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
    signContract,
    openDatePopup,
    closeDatePopup
  }
)(StyledComponent);
