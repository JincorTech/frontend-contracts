import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import SelectInput from '../SelectInput';
import Avatar from '../Avatar';
import DateInput from './DateInput';
import Input from '../Input';
import Caption from './Caption';
import WalletInput from './WalletInput';
import RadioGroup from './RadioGroup';

class CreateContractForm extends React.Component<{}, {}> {
  render() {
    return (
      <div styleName="form">
        <div styleName="avatar">
          <Avatar src={null} fullName={'Marcus Sullivan'} id={'4a516c0a-2c02-4a9f-9e2a-da6bc5ecf577'}/>
        </div>
        <div styleName="input">
          <SelectInput/>
        </div>
        <ol styleName="list">
          <li>
            <DateInput description={'Start date'} buttonText={'Pick date'}/>
          </li>
          <li>
            <Input styleName="text-input" placeholder={'Contract number'}/>
          </li>
          <li>
              <Caption text={'Wallets'} />
              <WalletInput value={'0x29D7d1d865…86B'} description={'Company wallet address'} />
              <WalletInput value={'0x32D9d1v909…91F'} description={'Employee wallet address'} />
              <div styleName="spacer"/>
          </li>
          <li>
            <Input styleName="text-input" placeholder={'Job title'}/>
            <Input styleName="small-text-input" placeholder={'Description of Job title'}/>
          </li>
          <li>
            <Caption text={'Type of employment'} />
            <RadioGroup values={['1', '2']} labels={['Full time', 'Part time']}/>
            <div styleName="spacer" />
          </li>
        </ol>
      </div>
    );
  }
};

export default CSSModules(CreateContractForm, require('./styles.css'));
