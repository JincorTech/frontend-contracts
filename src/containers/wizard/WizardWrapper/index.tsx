import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Avatar from '../../../components/common/Avatar';
import { StateMap as WizardStateProps, prevStep } from '../../../redux/modules/wizard/employmentAgreementWizard';
import { StateMap as AppStateProps } from '../../../redux/modules/app/appWrapper';

export type ComponentProps = {
};

export type DispatchProps = {
  prevStep: () => void
};

export type StateProps = WizardStateProps & AppStateProps;

export type Props = RouteComponentProps<{}, {}> & ComponentProps & DispatchProps & StateProps;

const WizardWrapper: SFC<Props> = (props) => {
  const {
    currentStep,
    prevStep,
    children,
    user
  } = props;

  const renderBackButtonBody = () => {
    return (
      <div>
        <img styleName="icon" src={require('../../../assets/images/back.svg')}/>
        <div styleName="caption">
          {'New smart contract'}
        </div>
      </div>
    );
  };

  return (
    <div styleName="layout">
      <div styleName="header">
        {currentStep === 0 ?
          <Link styleName="back" to={'/ctr/app/contracts/list'}>
            {renderBackButtonBody()}
          </Link> :
          <div styleName="back" onClick={prevStep}>
            {renderBackButtonBody()}
          </div>
        }
        <div styleName="avatar">
          <Avatar src={user.profile.avatar} fullName={user.profile.name} id={user.id}/>
        </div>
      </div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const styledComponent = CSSModules(WizardWrapper, require('./styles.css'));

export default connect<StateProps, DispatchProps, Props>(
  (state) => {
    return {
      ...state.app.appWrapper,
      ...state.wizard.employmentAgreementWizard
    };
  },
  {
    prevStep
  }
)(styledComponent);
