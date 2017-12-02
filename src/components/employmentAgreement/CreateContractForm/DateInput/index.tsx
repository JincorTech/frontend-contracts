import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

// export type Props = {
//   description: string
//   buttonText: string
// };

const DateInput = (props) => {
  const {
    description,
    buttonText,
    onClick,
    value,
    disabled,
    ...restProps
  } = props;

  return (
    <div styleName="date-input" onClick={!disabled ? onClick : null}>
      <span styleName="value">{value || description}</span>
      { !disabled ? <span styleName="button">{buttonText}</span> : null }
    </div>
  );
};

export default CSSModules(DateInput, require('./styles.css'));
