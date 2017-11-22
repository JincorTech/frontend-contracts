import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import SelectInput from '../../../components/employmentAgreement/createContractForm/SelectInput';
import Avatar from '../../../components/common/Avatar';
import DateInput from '../../../components/employmentAgreement/createContractForm/DateInput';
import Input from '../../../components/common/Input';
import Caption from '../../../components/employmentAgreement/createContractForm/Caption';
import WalletInput from '../../../components/employmentAgreement/createContractForm/WalletInput';
import RadioGroup from '../../../components/employmentAgreement/createContractForm/RadioGroup';
import Button from '../../../components/common/Button';

class CreateContractForm extends React.Component<{}, {}> {
  render() {
    return (
      <div styleName="form">
        <div styleName="avatar">
          <Avatar src={null} fullName={'Marcus Sullivan'} id={'4a516c0a-2c02-4a9f-9e2a-da6bc5ecf577'} />
        </div>
        <div styleName="input">
          <SelectInput />
        </div>
        <ol styleName="list">
          <li>
            <DateInput description={'Start date'} buttonText={'Pick date'} />
          </li>
          <li>
            <Input styleName="text-input" placeholder={'Contract number'} />
          </li>
          <li>
            <Caption text={'Wallets'} />
            <WalletInput value={'0x29D7d1d865…86B'} description={'Company wallet address'} />
            <WalletInput value={'0x32D9d1v909…91F'} description={'Employee wallet address'} />
            <div styleName="wallets-spacer" />
          </li>
          <li>
            <Input styleName="job-text-input" placeholder={'Job title'} />
            <Input styleName="small-text-input" placeholder={'Description of Job title'} />
          </li>
          <li>
            <Caption text={'Type of employment'} />
            <RadioGroup groupId={'type-of-employment'} values={['1', '2']} labels={['Full time', 'Part time']} />
            <div styleName="spacer" />
          </li>
          <li>
            <Caption text={'Period of agreement'} />
            <div styleName="period-radio-group">
              <RadioGroup groupId={'period-of-agreement'} values={['1', '2']} labels={['Fixed period', 'Permanent agreement']} />
            </div>
            <div styleName="spacer" />
            <div styleName="period-dates">
              <DateInput description={'Start date'} buttonText={'Pick start date'} />
              <DateInput description={'End date'} buttonText={'Pick end date'} />
            </div>
            <div styleName="spacer" />
          </li>
          <li>
            <Caption text={'Compensation'} />
            <Input styleName="text-input" placeholder={'Salary amount'} />
            <DateInput description={'Day of payments'} buttonText={'Pick date'} />
          </li>
          <li>
            <Caption text={'Additional сlauses'} />
            <Input styleName="small-text-input" placeholder={'Place for additional text'} />
          </li>
          <li>
            <Caption text={'Signatures'} />
            <span styleName="section-description">To sign contract you need to request code from Google Authentificator. After your signing request for the signing of the contract will be sent to your employee.</span>
            <span styleName="sign-status">Unsigned</span>
            <span styleName="sign-description">Employer signature</span>
          </li>
        </ol>
        <div styleName="create-button">
          <Button disabled={true}>Create smart contract</Button>
        </div>
      </div>
    );
  }
}

export default CSSModules(CreateContractForm, require('./styles.css'));
