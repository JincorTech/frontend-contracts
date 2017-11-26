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
import VerificationPopup from '../../../components/verification/VerificationPopup';
import {
  StateMap as StateProps,
  openPopup,
  closePopup,
  chooseEmployee,
  verifyContract,
  closeVerifyPopup,
  postContract
} from '../../../redux/modules/employmentAgreement/employmentAgreement';
import { getEmployeeById } from '../../../helpers/common/store';

export type Props = StateProps & DispatchProps & ComponentProps;

export type ComponentProps = {}

export type DispatchProps = {
  openPopup: () => void
  closePopup: () => void
  chooseEmployee: (id: string) => void
  postContract: () => void
  closeVerifyPopup: () => void
  verifyContract: () => void
}


class CreateContractForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      contractNumber: '',
      jobTitle: '',
      roleDescription: '',
      employmentType: 'full',
      agreementPeriod: 'fixed',
      startAgreemntDate: '',
      endAgreementDate: '',
      salaryAmount: '',
      paymentsDay: '',
      additionalClauses: ''
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('!!! state', this.state);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
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
      verifyContract
    } = this.props;

    const getEmployeeName = (id: string) => {
      const employee = getEmployeeById(employees, id);
      if (!employee) {
        return '';
      }

      return employee.name;
    }

    const getFilledStyle = (value) => {
      return value !== '' ? 'filled-item' : '';
    }

    return (
      <div styleName="form">
        <div styleName="avatar">
          <Avatar src={null} fullName={getEmployeeName(chosenEmployeeId)} id={chosenEmployeeId} />
        </div>
        <div styleName="input">
          <SelectInput text={getEmployeeName(chosenEmployeeId)} onButtonClick={openPopup}/>
        </div>
        <ol styleName="list">
          <li styleName={getFilledStyle(this.state.startDate)}>
            <DateInput name={'startDate'} value={this.state.startDate} onChange={this.handleChange} description={'Start date'} buttonText={'Pick date'} />
          </li>
          <li styleName={getFilledStyle(this.state.contractNumber)}>
            <Input name={'contractNumber'} value={this.state.contractNumber} onChange={this.handleChange} styleName="text-input" placeholder={'Contract number'} />
          </li>
          <li styleName="filled-item">
            <Caption text={'Wallets'} />
            <WalletInput value={'0x29D7d1d865…86B'} description={'Company wallet address'} />
            <WalletInput value={'0x32D9d1v909…91F'} description={'Employee wallet address'} />
            <div styleName="wallets-spacer" />
          </li>
          <li styleName={getFilledStyle(this.state.jobTitle)}>
            <Input name={'jobTitle'} value={this.state.jobTitle} onChange={this.handleChange} styleName="job-text-input" placeholder={'Job title'} />
            <Input name={'roleDescription'} value={this.state.roleDescription} onChange={this.handleChange} styleName="small-text-input" placeholder={'Role desription'} />
          </li>
          <li styleName="filled-item">
            <Caption text={'Type of employment'} />
            <RadioGroup name={'employmentType'} value={this.state.employmentType} onChange={this.handleChange} groupId={'type-of-employment'} values={['full', 'part']} labels={['Full time', 'Part time']} />
            <div styleName="spacer" />
          </li>
          <li styleName="filled-item">
            <Caption text={'Period of agreement'} />
            <div styleName="period-radio-group">
              <RadioGroup name={'agreementPeriod'} value={this.state.agreementPeriod} onChange={this.handleChange} groupId={'period-of-agreement'} values={['fixed', 'permanent']} labels={['Fixed period', 'Permanent agreement']} />
            </div>
            <div styleName="spacer" />
            <div styleName="period-dates">
              <DateInput name={'startAgreemntDate'} value={this.state.startAgreemntDate} onChange={this.handleChange} description={'Start date'} buttonText={'Pick start date'} />
              <DateInput name={'endAgreementDate'} value={this.state.endAgreementDate} onChange={this.handleChange} description={'End date'} buttonText={'Pick end date'} />
            </div>
            <div styleName="spacer" />
          </li>
          <li styleName={getFilledStyle(this.state.salaryAmount)}>
            <Caption text={'Compensation'} />
            <Input name={'salaryAmount'} value={this.state.salaryAmount} onChange={this.handleChange} styleName="text-input" placeholder={'Salary amount'} />
            <DateInput name={'paymentsDay'} value={this.state.paymentsDay} onChange={this.handleChange} description={'Day of payments'} buttonText={'Pick date'} />
          </li>
          <li styleName={getFilledStyle(this.state.additionalClauses)}>
            <Caption text={'Additional сlauses'} />
            <Input name={'additionalClauses'} value={this.state.additionalClauses} onChange={this.handleChange} styleName="small-text-input" placeholder={'Place for additional text'} />
          </li>
          <li>
            <Caption text={'Signatures'} />
            <span styleName="section-description">To sign contract you need to request code from Google Authentificator. After your signing request for the signing of the contract will be sent to your employee.</span>
            <span styleName="sign-status">Unsigned</span>
            <span styleName="sign-description">Employer signature</span>
          </li>
        </ol>
        <div styleName="create-button">
          <Button disabled={false} onClick={postContract}>Create smart contract</Button>
        </div>
        <ChooseEmployeePopup open={popupIsOpened} onClose={closePopup} employees={employees} onSelect={chooseEmployee}/>
        <VerificationPopup open={verifyPopupIsOpened} onClose={closeVerifyPopup} onSubmit={verifyContract}/>
      </div>
    );
  }
}

const StyledComponent = CSSModules(CreateContractForm, require('./styles.css'));

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.employmentAgreement.employmentAgreement,
  {
    openPopup,
    closePopup,
    chooseEmployee,
    verifyContract,
    closeVerifyPopup,
    postContract
  }
)(StyledComponent);
