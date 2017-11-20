import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = {
  values: string[]
  labels: string[]
}

const RadioGroup: SFC<Props> = (props) => {
  const {
    values,
    labels
  } = props;

  return (
    <div>
      {values.map((currentValue, index) => (
        <div styleName="item">
            <input type="radio" id={`radio-item-${index}`} value={currentValue}/>
            <label htmlFor={`radio-item-${index}`}>
            <span>{labels[index] ? labels[index] : ''}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CSSModules(RadioGroup, require('./styles.css'));
