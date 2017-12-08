import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Avatar from '../../../components/common/Avatar';
import { StateMap as WizardStateProps, prevStep } from '../../../redux/modules/wizard/employmentAgreementWizard';
import { StateMap as AppStateProps } from '../../../redux/modules/app/appWrapper';
import ProfileCard from '../../app/ProfileCard';
import { StateMap as ProfileStateProps, openProfileCard } from '../../../redux/modules/app/profileCard';

export type ComponentProps = {
};

export type DispatchProps = {
  prevStep: () => void
  openProfileCard: () => void
};

export type StateProps = WizardStateProps & AppStateProps & ProfileStateProps;

export type Props = RouteComponentProps<{}, {}> & ComponentProps & DispatchProps & StateProps;

const WizardWrapper: SFC<Props> = (props) => {
  const {
    currentStep,
    prevStep,
    children,
    user,
    openProfileCard
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
          <Link styleName="back" to={'/contracts/app/contracts/list'}>
            {renderBackButtonBody()}
          </Link> :
          <div styleName="back" onClick={prevStep}>
            {renderBackButtonBody()}
          </div>
        }
        <div styleName="avatar">
          <Avatar src={user.profile.avatar} fullName={user.profile.name} id={user.id}
          onClick={openProfileCard} />
        </div>
      </div>
      <div>
        <div>{children}</div>
      </div>
      <ProfileCard user={user}/>
    </div>
  );
};

const styledComponent = CSSModules(WizardWrapper, require('./styles.css'));

export default connect<StateProps, DispatchProps, Props>(
  (state) => {
    return {
      ...state.app.appWrapper,
      ...state.app.profileCard,
      ...state.wizard.employmentAgreementWizard
    };
  },
  {
    prevStep,
    openProfileCard
  }
)(styledComponent);
