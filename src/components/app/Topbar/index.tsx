import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

import Pagename from '../../common/Pagename';

export type Props = {
  pathname: string;
};

const Topbar: SFC<Props> = (pathname) => (
  <div styleName="topbar">
    <div styleName="title"><Pagename pathname={pathname}/></div>
    <div styleName="faq"></div>
  </div>
);

export default CSSModules(Topbar, require('./styles.css'));
