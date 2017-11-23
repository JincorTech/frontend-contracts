import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type ComponentProps = {
  name: string
  onSelect: () => void
};

const Tab: SFC<ComponentProps> = (props) => {
  return (
    <div styleName="tab" onClick={props.onSelect}>
      <span>{props.name}</span>
    </div>
  );
};

export default CSSModules(Tab, require('./styles.css'));
