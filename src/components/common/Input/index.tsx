import * as React from 'react';
import { Component, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';
import { isNumeric, isInteger } from '../../../helpers/common/format';

export type Props = HTMLProps<HTMLInputElement> & {
  invalid?: boolean
  caption?: boolean
  captionText?: string
  precision?: number
  onChange?: (e) => void
};

export class Input extends Component<Props, {}> {
  public inputElement: HTMLInputElement;

  public render(): JSX.Element {
    const NumberType = 'number';
    const IntegerType = 'integer';

    const { invalid, caption, placeholder, onChange, type, captionText, precision, ...inputProps } = this.props;

    const handleChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      if (type === NumberType || type === IntegerType) {
        const isValidNumber = type === NumberType ? isNumeric(value) : isInteger(value);

        if (value && !isValidNumber) {
          event.target.value = '';
          return;
        }

        const isInRegion = +value <= +target.max && (!target.min || +value >= +target.min);
        if (value && !isInRegion) {
          event.target.value = '';
          return;
        }

        const pointIndex = value.indexOf('.');
        if (type === NumberType && value && pointIndex !== -1
            && value.length - pointIndex - 1 > precision) {
          event.target.value = '';
          return;
        }
      }

      onChange(event);
    };

    return (
      <div styleName="container">
        <input styleName={invalid ? 'invalid' : 'default'} ref={(input) => this.inputElement = input} placeholder={placeholder} onChange={handleChange} {...inputProps}/>
        {caption ?
          <span styleName={inputProps.value ? 'shifted-label' : 'label'}>{captionText || placeholder}</span> : null
        }
      </div>
    );
  }
}

export default CSSModules(Input, require('./styles.css'));
