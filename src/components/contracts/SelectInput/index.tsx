import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import Button from '../Button';

const SelectInput: SFC<{}> = () => {
  return (
    <div styleName="input">
      <span styleName="value">Employee</span>
      <div styleName="button">
        <Button>Choose</Button>
      </div>
    </div>
  );
};

export default CSSModules(SelectInput, require('./styles.css'));
