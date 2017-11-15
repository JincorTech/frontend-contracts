import * as React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';
import { push } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import App from './containers/app/App';

import AuthLayout from './components/auth/AuthLayout';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import RestorePassword from './containers/auth/RestorePassword';
import RegisterEmployee from './containers/auth/RegisterEmployee';
import VerifyEmployeeToken from './components/auth/VerifyEmployeeToken';
import InviteEmployees from './containers/auth/InviteEmployees';

import AppLayout from './components/contracts/AppLayout';
import Contracts from './components/contracts/Contracts';
import FormLayout from './components/contracts/FormLayout';
import ContractTypesForm from './components/contracts/ContractTypesForm';
import ChooseEmployeeForm from './components/contracts/ChooseEmployeeForm';

import ProfileEdit from './containers/profile/ProfileEdit';
import ProfileView from './containers/profile/ProfileView';
import Employees from './containers/employees/Employees';
import Search from './containers/search/Search';
import Messenger from './containers/messenger/Messenger';

// named routes
export const routes = {
  base: '/cmp',
  signIn: '/cmp/auth/signin',
  signUp: '/cmp/auth/signup',
  restorePassword: '/cmp/auth/password',
  employeeSignUp: '/cmp/auth/invite',
  inviteEmployees: 'cmp/auth/verify',
  profile: '/cmp/app/profile',
  profileEdit: '/cmp/app/profile/edit',
  employees: '/cmp/app/employees',
  search: '/cmp/app/search'
};

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.app.app,
  predicate: (app) => app.authorized,
  redirectAction: push,
  failureRedirectPath: routes.signIn,
  allowRedirectBack: false
});

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.app.app,
  predicate: (app) => !app.authorized,
  redirectAction: push,
  failureRedirectPath: routes.base,
  allowRedirectBack: false
});

const UserIsAdmin = UserAuthWrapper({
  authSelector: (state) => state.app.app,
  predicate: (app) => app.admin,
  redirectAction: push,
  failureRedirectPath: routes.base,
  allowRedirectBack: false
});

export default (
  <Route path="/cmp" component={App}>
    <IndexRedirect to="/cmp/new"/>

    <Route path="auth" component={UserIsNotAuthenticated(AuthLayout)}>
      <Route path="signup" component={SignUp}/>
      <Route path="signin" component={SignIn}/>
      <Route path="password" component={RestorePassword}/>
      <Route path="invite" component={VerifyEmployeeToken(RegisterEmployee)}/>
      <Route path="verify" component={InviteEmployees}/>
    </Route>

    <Route path="app" component={UserIsAuthenticated(AppLayout)}>
      <Route path="contracts" component={Contracts}/>
      <Route path="employees" component={Employees}/>
      <Route path="search" component={Search}/>
      <Route path="messenger" component={Messenger}/>
    </Route>

    <Route path="form" component={FormLayout}>
      <Route path="new" component={ContractTypesForm}/>
      <Route path="employee" component={ChooseEmployeeForm}/>
    </Route>

    <Redirect from="*" to="/cmp/auth/signin" />
  </Route>
);
