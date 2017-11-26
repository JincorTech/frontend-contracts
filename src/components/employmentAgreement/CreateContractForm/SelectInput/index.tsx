import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import Button from '../../../common/Button';

export type Props = {
  onButtonClick?: () => void
}

const SelectInput: SFC<Props> = (props) => {
  return (
    <div styleName="input">
      <span styleName="value">Employee</span>
      <div styleName="button">
        <Button onClick={props.onButtonClick}>Choose</Button>
      </div>
    </div>
  );
};

export default CSSModules(SelectInput, require('./styles.css'));
