import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import Sidebar from '../../app/Sidebar';
import Topbar from '../../../containers/app/Topbar';

export type ComponentProps = {};

export type Props = RouteComponentProps<ComponentProps, {}>;

const ContractsWrapper: SFC<Props> = (props) => {
  return (
    <div styleName="wrapper">
      <div styleName="sidebar">
        <Sidebar/>
      </div>
      <div styleName="main">
        <Topbar pathname={props.location.pathname}/>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default CSSModules(ContractsWrapper, require('./styles.css'));
