import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import Tab from './Tab';

const TabPanel: SFC<{}> = ({}) => {
  return (
    <div styleName="tabs">
      <Tab name={'Latest'}/>
      <Tab name={'Sort by name'}/>
      <Tab name={'Unsigned contracts'}/>
    </div>
  );
};

export default CSSModules(TabPanel, require('./styles.css'));
