import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import Button from '../../../common/Button';

export type Props = {
  onButtonClick?: () => void
  text?: string
}

const SelectInput: SFC<Props> = (props) => {
  const {
    text,
    onButtonClick
  } = props;

  return (
    <div styleName="input">
      <span styleName="value">{text || 'Employee'}</span>
      <div styleName="button">
        <Button onClick={onButtonClick}>Choose</Button>
      </div>
    </div>
  );
};

export default CSSModules(SelectInput, require('./styles.css'));
