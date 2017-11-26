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
    ...restProps
  } = props;

  return (
    <div styleName="date-input">
      <span styleName="value">{`${description}: `}</span>
      <input styleName="input" type="date" {...restProps}/>
      {/* <span styleName="button">{buttonText}</span> */}
    </div>
  );
};

export default CSSModules(DateInput, require('./styles.css'));
