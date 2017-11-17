import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = {
  description: string
  buttonText: string
}

const DateInput: SFC<Props> = (props) => {
  const {
    description,
    buttonText
  } = props;

  return (
    <div styleName="date-input">
      <div styleName="input">
        <span styleName="value">{description}</span>
        <span styleName="button">{buttonText}</span>
      </div>
      <div styleName="description">
      </div>
    </div>
  );
};

export default CSSModules(DateInput, require('./styles.css'));
