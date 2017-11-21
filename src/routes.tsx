import * as React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import App from './containers/app/App';

import AppLayout from './components/app/AppLayout';
import ContractsPage from './containers/contracts/ContractsPage';
import FormLayout from './components/form/FormLayout';
import ContractTypesForm from './containers/newContractWizard/ContractTypesForm';
import ChooseEmployeeForm from './containers/newContractWizard/ChooseEmployeeForm';
import ChooseEmployeePopup from './components/newContractWizard/ChooseEmployeePopup';
import VerificationPopup from './components/verification/VerificationPopup';

// named routes
export const routes = {
  base: '/ctr'
};

export default (
  <Route path="/ctr" component={App}>
    <IndexRedirect to="/ctr/app/contracts"/>

    <Route path="app" component={AppLayout}>
      <Route path="contracts" component={ContractsPage}/>
    </Route>

    <Route path="form" component={FormLayout}>
      <Route path="new" component={ContractTypesForm}/>
      <Route path="employee" component={ChooseEmployeeForm}/>
    </Route>

    <Route path="popup" component={ChooseEmployeePopup}/>
    <Route path="verifypopup" component={VerificationPopup}/>

    <Redirect from="*" to="/cmp/auth/signin" />
  </Route>
);
