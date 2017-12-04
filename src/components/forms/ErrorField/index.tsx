import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = {
  validators: { (value: string): string }[]
  value: string
};

const ErrorField: SFC<Props> = (props) => {
  const {
    validators,
    value
  } = props;

  for (let i = 0; i < validators.length; ++i) {
    const validatorMessage = validators[i](value);
    if (validatorMessage !== '') {
      return (
        <div styleName="error">
          {validatorMessage}
        </div>
      );
    }
  }
};

export default CSSModules(ErrorField, require('./styles.css'));
