import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import SelectInput from '../SelectInput';
import Avatar from '../Avatar';
import DateInput from './DateInput';

const CreateContractForm: SFC<{}> = () => {
  return (
    <div styleName="form">
      <div styleName="avatar">
        <Avatar src={null} fullName={'Marcus Sullivan'} id={'4a516c0a-2c02-4a9f-9e2a-da6bc5ecf577'}/>
      </div>
      <SelectInput/>
      <ol styleName="list">
        <li>
          <DateInput description={'Start date'} buttonText={'Pick date'}/>
        </li>
      </ol>
    </div>
  );
};

export default CSSModules(CreateContractForm, require('./styles.css'));
