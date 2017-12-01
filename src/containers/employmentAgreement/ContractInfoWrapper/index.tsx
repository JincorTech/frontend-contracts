import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Avatar from '../../../components/common/Avatar';
import { StateMap as ContractStateProps } from '../../../redux/modules/employmentAgreement/employmentAgreement';
import { StateMap as AppStateProps } from '../../../redux/modules/app/appWrapper';
import { resetState } from '../../../redux/modules/wizard/employmentAgreementWizard';

export type ComponentProps = {
};

export type DispatchProps = {
  resetState: () => void
}

export type StateProps = ContractStateProps & AppStateProps;

export type Props = RouteComponentProps<{}, {}> & ComponentProps & DispatchProps & StateProps;

const ContractInfoWrapper: SFC<Props> = (props) => {
  const {
    resetState,
    user
  } = props;

  return (
    <div styleName="layout">
      <div styleName="header">
        <Link onClick={resetState} styleName="back" to={'/ctr/app/contracts/list'}>
          <img styleName="icon" src={require('../../../assets/images/back.svg')}/>
          <div styleName="caption">
            {'Dashboard'}
          </div>
        </Link>
        <div styleName="avatar">
          <Avatar src={user.profile.avatar} fullName={user.profile.name} id={user.id} />
        </div>
      </div>
      <div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

const styledComponent = CSSModules(ContractInfoWrapper, require('./styles.css'));

export default connect<StateProps, DispatchProps, Props>(
  (state) => {
    return {
      ...state.app.appWrapper,
      ...state.wizard.employmentAgreementWizard
    }
  },
  {
    resetState
  }
)(styledComponent);