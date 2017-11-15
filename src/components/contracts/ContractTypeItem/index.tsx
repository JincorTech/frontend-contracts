import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type ComponentProps = {
  name: string
  description: string
  disabled: boolean
}

const ContractTypeItem: SFC<ComponentProps> = (props) => {
  return (
    <div styleName="type">
      <div styleName={props.disabled ? 'disabled' : 'name'}>{props.name}</div>
      <div styleName="description">{props.description}</div>
    </div>
  );
};

export default CSSModules(ContractTypeItem, require('./styles.css'));
