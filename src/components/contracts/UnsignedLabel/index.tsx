import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

const UnsignedLabel: SFC<{}> = () => {
  return (
    <span styleName="label">UNSIGNED</span>
  );
};

export default CSSModules(UnsignedLabel, require('./styles.css'));
