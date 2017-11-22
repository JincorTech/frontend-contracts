import * as React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import App from './containers/app/App';

import AppWrapper from './components/app/AppWrapper';
import ContractsPage from './containers/contracts/ContractsPage';
import WizardWrapper from './components/wizard/WizardWrapper';
import ContractTypesForm from './containers/employmentAgreement/ContractTypesForm';
import ChooseEmployeeForm from './containers/employmentAgreement/ChooseEmployeeForm';
import ChooseEmployeePopup from './components/employmentAgreement/ChooseEmployeePopup';
import VerificationPopup from './components/verification/VerificationPopup';

// named routes
export const routes = {
  base: '/ctr'
};

export default (
  <Route path="/ctr" component={App}>
    <IndexRedirect to="/ctr/app/contracts"/>

    <Route path="app" component={AppWrapper}>
      <Route path="contracts" component={ContractsPage}/>
    </Route>

    <Route path="form" component={WizardWrapper}>
      <Route path="new" component={ContractTypesForm}/>
      <Route path="employee" component={ChooseEmployeeForm}/>
    </Route>

    <Route path="popup" component={ChooseEmployeePopup}/>
    <Route path="verifypopup" component={VerificationPopup}/>

    <Redirect from="*" to="/cmp/auth/signin" />
  </Route>
);
