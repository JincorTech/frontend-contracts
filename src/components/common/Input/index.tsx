import * as React from 'react';
import { Component, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = HTMLProps<HTMLInputElement> & {
  invalid?: boolean
  caption?: boolean
  captionText?: string
  onChange?: (e) => void
};

export class Input extends Component<Props, {}> {
  public inputElement: HTMLInputElement;

  public render(): JSX.Element {
    const { invalid, caption, placeholder, onChange, type, captionText, ...inputProps } = this.props;

    const isNumeric = (n) => {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };

    const handleChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      if (type === 'number') {
        const isValidNumber = value === '' || isNumeric(value);
        if (!isValidNumber) {
          event.target.value = '';
          return;
        }

        const isInRegion = +value <= +target.max && (!target.min || +value >= +target.min);
        if (!isInRegion) {
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
