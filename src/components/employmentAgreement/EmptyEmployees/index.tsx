import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

const EmptyEmployees: SFC<{}> = () => {
  return (
    <span styleName="text">There are no other employees in your company yet...</span>
  );
};

export default CSSModules(EmptyEmployees, require('./styles.css'));
