import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { routes } from '../../../routes';
import { RouteComponentProps } from 'react-router';

import {
  fetchUser,
  User
} from '../../../redux/modules/app/appWrapper';

/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps & RouteComponentProps<ComponentProps, {}>;

export type ComponentProps = {};

export type StateProps = {
  user: User
  isAuth: boolean
};

export type DispatchProps = {
  fetchUser: () => void
};

/**
 * Component
 */
class AppWrapper extends Component<Props, StateProps> {
  public componentDidMount(): void {
    this.props.fetchUser();
  }

  render() {
    if (!this.props.user) {
      return null;
    }

    const { user, children, isAuth } = this.props;
    const { id, profile } = user;

    return (
      <div>
        {children}
      </div>
    );
  }
}

/**
 * Decorators
 */
export default connect<StateProps, DispatchProps, any>(
  (state) => ({
    ...state.app.appWrapper,
    isAuth: state.app.app.authorized
  }),
  {
    fetchUser
  }
)(AppWrapper);
