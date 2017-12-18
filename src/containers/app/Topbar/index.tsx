import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import Pagename from '../../../components/common/Pagename';
import Avatar from '../../../components/common/Avatar';
import { StateMap as ProfileCardState, openProfileCard } from '../../../redux/modules/app/profileCard';
import { StateMap as AppState } from '../../../redux/modules/app/appWrapper';
import ProfileCard from '../ProfileCard';

export type Props = StateProps & ComponentProps & DispatchProps;

export type ComponentProps = {
  pathname: string;
};

export type StateProps = ProfileCardState & AppState;

export type DispatchProps = {
  openProfileCard: () => void
}

const Topbar: SFC<Props> = (props) => {
  const {
    pathname,
    openProfileCard,
    user
  } = props;

  return (
    <div styleName="topbar">
      <div styleName="title"><Pagename pathname={pathname} /></div>
      {user.id
        ? <div styleName="avatar">
            <Avatar styleName="avatar-icon" src={user.profile.avatar} fullName={user.profile.name}
              id={user.id} onClick={openProfileCard} />
          </div>
        : null
      }
      <ProfileCard user={user}/>
    </div>
  );
};

/**
 * Decorators
 */
const StyledComponent = CSSModules(Topbar, require('./styles.css'));

export default connect<StateProps, DispatchProps, any>(
  (state) => ({
    ...state.app.appWrapper,
    ...state.app.profileCard
  }),
  {
    openProfileCard
  }
)(StyledComponent);
