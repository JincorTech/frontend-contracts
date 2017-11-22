import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = {
  groupId: string
  values: string[]
  labels: string[]
};

const RadioGroup: SFC<Props> = (props) => {
  const {
    groupId,
    values,
    labels
  } = props;

  const getButtonId = (index) => `radio-item-${groupId}-${index}`;

  return (
    <div>
      {values.map((currentValue, index) => (
        <div key={index} styleName="item">
          <input type="radio" id={getButtonId(index)} value={currentValue} />
          <label htmlFor={getButtonId(index)}>
            <span>{labels[index] ? labels[index] : ''}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CSSModules(RadioGroup, require('./styles.css'));
