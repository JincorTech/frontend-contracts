import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

import Pagename from '../Pagename';

const Topbar = ({ pathname }) => (
  <div styleName='topbar'>
    <div styleName='title'><Pagename pathname={pathname}/></div>
    <div styleName='faq'></div>
  </div>
);

export default CSSModules(Topbar, require('./styles.css'));
