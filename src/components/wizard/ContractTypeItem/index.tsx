import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type ComponentProps = {
  name: string
  description: string
  disabled: boolean
  onClick?: () => void
};

const ContractTypeItem: SFC<ComponentProps> = (props) => {
  return (
    <div styleName="type" onClick={props.onClick}>
      <div styleName={props.disabled ? 'disabled' : 'name'}>{props.name}</div>
      <div styleName="description">{props.description}</div>
    </div>
  );
};

export default CSSModules(ContractTypeItem, require('./styles.css'));
