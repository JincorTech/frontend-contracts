import * as React from 'react';
import { Component, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = HTMLProps<HTMLInputElement> & {
  invalid?: boolean
  caption?: boolean
};

export class Input extends Component<Props, {}> {
  public inputElement: HTMLInputElement;

  public render(): JSX.Element {
    const { invalid, caption, placeholder, ...inputProps } = this.props;

    return (
      <div styleName="container">
        <input styleName={invalid ? 'invalid' : 'default'} ref={(input) => this.inputElement = input} placeholder={placeholder} {...inputProps}/>
        {caption ? 
          <span styleName={inputProps.value ? 'shifted-label' : 'label'}>{placeholder}</span> : null
        }
      </div>
    );
  }
}

export default CSSModules(Input, require('./styles.css'));
