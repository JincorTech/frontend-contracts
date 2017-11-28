import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Avatar from '../../../components/common/Avatar';
import { StateMap as StateProps } from '../../../redux/modules/employmentAgreement/employmentAgreement';

export type ComponentProps = {
};

export type DispatchProps = {
}

export type Props = RouteComponentProps<{}, {}> & ComponentProps & DispatchProps & StateProps;

const ContractInfoWrapper: SFC<Props> = (props) => {
  return (
    <div styleName="layout">
      <div styleName="header">
        <Link styleName="back" to={'/ctr/app/contracts'}>
          <img styleName="icon" src={require('../../../assets/images/back.svg')}/>
          <div styleName="caption">
            {'Dashboard'}
          </div>
        </Link>
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

const styledComponent = CSSModules(ContractInfoWrapper, require('./styles.css'));

export default connect<StateProps, DispatchProps, Props>(
  (state) => state.wizard.employmentAgreementWizard,
  {

  }
)(styledComponent);