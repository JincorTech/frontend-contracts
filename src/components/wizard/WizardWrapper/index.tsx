import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import Avatar from '../../../components/common/Avatar';

export type ComponentProps = {
};

export type Props = RouteComponentProps<ComponentProps, {}>;

const WizardWrapper: SFC<Props> = (props) => {
  return (
    <div styleName="layout">
      <div styleName="header">
        <div styleName="back">
          <div styleName="icon">
            {'<'}
          </div>
          <div styleName="caption">
            {'New smart contract'}
          </div>
        </div>
        <div styleName="avatar">
          <Avatar src={'/src'} fullName={''} id={''}/>
        </div>
      </div>
      <div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default CSSModules(WizardWrapper, require('./styles.css'));
