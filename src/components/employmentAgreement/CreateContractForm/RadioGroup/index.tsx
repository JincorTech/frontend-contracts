import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

// export type Props = {
//   groupId: string
//   values: string[]
//   labels: string[]
// };

const RadioGroup = (props) => {
  const {
    groupId,
    values,
    labels,
    name,
    value,
    onChange
  } = props;

  const getButtonId = (index) => `radio-item-${groupId}-${index}`;

  return (
    <div>
      {values.map((currentValue, index) => (
        <div key={index} styleName="item">
          <input type="radio" id={getButtonId(index)} name={name} value={currentValue} checked={value === currentValue} onChange={onChange}/>
          <label htmlFor={getButtonId(index)}>
            <span>{labels[index] ? labels[index] : ''}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CSSModules(RadioGroup, require('./styles.css'));
