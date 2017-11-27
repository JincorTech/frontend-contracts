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
import { required, minLength, maxLength } from '../../../utils/validators';

export type Props = StateProps & DispatchProps & ComponentProps;

export type ComponentProps = {}

export type DispatchProps = {
  openPopup: () => void
  closePopup: () => void
  chooseEmployee: (id: string) => void
  postContract: (contractBody: any) => void
  closeVerifyPopup: () => void
  verifyContract: () => void
}


class CreateContractForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      contractDate: '',
      contractNumber: '',
      jobTitle: '',
      roleDescription: '',
      employmentType: 'full',
      agreementPeriod: 'fixed',
      startAgreementDate: '',
      endAgreementDate: '',
      salaryAmount: '',
      paymentsDay: '',
      additionalClauses: ''
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    if (target.type === 'number' && value !== '' && (+value > +target.max || !parseFloat(value))) {
      return;
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const contract = { ...this.state, employeeId: this.props.chosenEmployeeId };
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
      <form onSubmit={this.handleSubmit} styleName="form">
        <div styleName="avatar">
          <Avatar src={null} fullName={getEmployeeName(chosenEmployeeId)} id={chosenEmployeeId} />
        </div>
        <div styleName="input">
          <SelectInput text={getEmployeeName(chosenEmployeeId)} onButtonClick={openPopup}/>
        </div>
        <ol styleName="list">
          <li styleName={getFilledStyle(this.state.startDate)}>
            <DateInput name={'contractDate'} value={this.state.contractDate} onChange={this.handleChange} description={'Contract date'} buttonText={'Pick date'} />
          </li>
          <li styleName={getFilledStyle(this.state.contractNumber)}>
            <Input name={'contractNumber'} type="number" max={999999} value={this.state.contractNumber} onChange={this.handleChange} styleName="text-input" placeholder={'Contract number'} />
          </li>
          <li styleName="filled-item">
            <Caption text={'Wallets'} />
            <WalletInput value={'0x29D7d1d865…86B'} description={'Company wallet address'} />
            <WalletInput value={'0x32D9d1v909…91F'} description={'Employee wallet address'} />
            <div styleName="wallets-spacer" />
          </li>
          <li styleName={getFilledStyle(this.state.jobTitle)}>
            <Input name={'jobTitle'} value={this.state.jobTitle} maxLength={100} onChange={this.handleChange} styleName="job-text-input" placeholder={'Job title'} />
            <Input name={'roleDescription'} value={this.state.roleDescription} maxLength={100} onChange={this.handleChange} styleName="small-text-input" placeholder={'Role desription'} />
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
              <DateInput name={'startAgreementDate'} value={this.state.startAgreementDate} onChange={this.handleChange} description={'Start date'} buttonText={'Pick start date'} />
              <DateInput name={'endAgreementDate'} value={this.state.endAgreementDate} onChange={this.handleChange} description={'End date'} buttonText={'Pick end date'} />
            </div>
            <div styleName="spacer" />
          </li>
          <li styleName={getFilledStyle(this.state.salaryAmount)}>
            <Caption text={'Compensation'} />
            <Input name={'salaryAmount'} type="number" max={9999999999} value={this.state.salaryAmount} onChange={this.handleChange} styleName="text-input" placeholder={'Salary amount'} />
            <DateInput name={'paymentsDay'} value={this.state.paymentsDay} onChange={this.handleChange} description={'Day of payments'} buttonText={'Pick date'} />
          </li>
          <li styleName={getFilledStyle(this.state.additionalClauses)}>
            <Caption text={'Additional сlauses'} />
            <Input name={'additionalClauses'} value={this.state.additionalClauses} maxLength={100} onChange={this.handleChange} styleName="small-text-input" placeholder={'Place for additional text'} />
          </li>
          <li>
            <Caption text={'Signatures'} />
            <span styleName="section-description">To sign contract you need to request code from Google Authentificator. After your signing request for the signing of the contract will be sent to your employee.</span>
            <span styleName="sign-status">Unsigned</span>
            <span styleName="sign-description">Employer signature</span>
          </li>
        </ol>
        <div styleName="create-button">
          <Button isSubmit={true} disabled={false} value={'Create smart contract'}/>
        </div>
        <ChooseEmployeePopup open={popupIsOpened} onClose={closePopup} employees={employees} onSelect={chooseEmployee}/>
        <VerificationPopup open={verifyPopupIsOpened} onClose={closeVerifyPopup} onSubmit={verifyContract}/>
      </form>
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
