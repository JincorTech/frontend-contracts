import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import Avatar from '../../../components/common/Avatar';
import { StateMap as StateProps, prevStep, Step } from '../../../redux/modules/wizard/employmentAgreementWizard';

export type ComponentProps = {
};

export type DispatchProps = {
  prevStep: () => void
}

export type Props = RouteComponentProps<{}, {}> & ComponentProps & DispatchProps & StateProps;

const WizardWrapper: SFC<Props> = (props) => {
  return (
    <div styleName="layout">
      <div styleName="header">
        <div styleName="back" onClick={props.prevStep}>
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

const styledComponent = CSSModules(WizardWrapper, require('./styles.css'));

export default connect<StateProps, DispatchProps, Props>(
  (state) => state.wizard.employmentAgreementWizard,
  {
    prevStep
  }
)(styledComponent);