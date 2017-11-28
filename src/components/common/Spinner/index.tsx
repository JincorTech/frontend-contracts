import * as React from 'react';
import * as CSSModules from 'react-css-modules';

const Spinner = () => (
  <div styleName="spinner">
    <div styleName="bounceOne"></div>
    <div styleName="bounceTwo"></div>
    <div styleName="bounceThree"></div>
  </div>
);

export default CSSModules(Spinner, require('./styles.css'));
