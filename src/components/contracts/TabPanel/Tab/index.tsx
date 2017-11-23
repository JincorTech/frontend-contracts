import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type ComponentProps = {
  name: string
  isActive: boolean
  onSelect: () => void
};

const Tab: SFC<ComponentProps> = (props) => {
  const {
    onSelect,
    isActive
  } = props;

  return (
    <div styleName={isActive ? 'active' : 'tab'} onClick={onSelect}>
      <span>{props.name}</span>
    </div>
  );
};

export default CSSModules(Tab, require('./styles.css'));
