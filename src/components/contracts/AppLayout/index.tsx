import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';

export type ComponentProps = {}

export type Props = RouteComponentProps<ComponentProps, {}>

const AppLayout: SFC<Props> = (props) => {

  return (
    <div styleName='wrapper'>
      <div styleName='sidebar'>
        <Sidebar/>
      </div>
      <div styleName='main'>
        <Topbar pathname={'/dashboard'}/>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default CSSModules(AppLayout, require('./styles.css'));
