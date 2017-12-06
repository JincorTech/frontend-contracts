import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

const EmptyContracts: SFC<{}> = () => {
  return (
    <span styleName="text">There is no contracts yet...</span>
  );
};

export default CSSModules(EmptyContracts, require('./styles.css'));
