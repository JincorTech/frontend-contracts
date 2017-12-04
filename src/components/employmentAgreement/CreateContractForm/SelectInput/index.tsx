import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import Button from '../../../common/Button';

export type Props = {
  onButtonClick?: () => void
  text?: string
  disabled?: boolean
};

const SelectInput: SFC<Props> = (props) => {
  const {
    text,
    onButtonClick,
    disabled
  } = props;

  return (
    <div styleName="input">
      <span styleName="value">{text || 'Employee'}</span>

      {!disabled ?
        <div styleName="button">
          <Button onClick={onButtonClick}>Choose</Button>
        </div> : null
      }
    </div>
  );
};

export default CSSModules(SelectInput, require('./styles.css'));
