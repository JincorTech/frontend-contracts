import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import SelectInput from '../SelectInput';

const ChooseEmployeeForm: SFC<{}> = () => {
  return (
    <div styleName="form">
      <div styleName="image"/>
      <span styleName="caption">Hey ya!</span>
      <span styleName="description">
        This is smart contract creation interface. To start creating new contract,
        choose the employee and tap next button.
      </span>
      <SelectInput/>
    </div>
  );
};

export default CSSModules(ChooseEmployeeForm, require('./styles.css'));
