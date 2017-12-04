import * as React from 'react';
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
    caption
  } = props;

  return (
    <div styleName="container">
      <div styleName="date-input" onClick={!disabled ? onClick : null}>
        <span styleName={value ? 'filled' : 'value'}>{value || description}</span>
        {!disabled ? <span styleName="button">{buttonText}</span> : null}
      </div>
      {caption && value ?
        <span styleName={'shifted-label'}>{description}</span> : null
      }
    </div>
  );
};

export default CSSModules(DateInput, require('./styles.css'));
