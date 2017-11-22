import * as React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import App from './containers/app/App';

import AppLayout from './components/common/AppLayout';
import Contracts from './components/common/Contracts';
import FormLayout from './components/common/FormLayout';
import ContractTypesForm from './components/common/ContractTypesForm';
import ChooseEmployeeForm from './components/common/ChooseEmployeeForm';
import CreateContractForm from './components/common/CreateContractForm';
import ChooseEmployeePopup from './components/common/ChooseEmployeePopup';
import VerificationPopup from './components/common/VerificationPopup';

// named routes
export const routes = {
  base: '/ctr'
};

export default (
  <Route path="/ctr" component={App}>
    <IndexRedirect to="/ctr/app/contracts"/>

    <Route path="app" component={AppLayout}>
      <Route path="contracts" component={Contracts}/>
    </Route>

    <Route path="form" component={FormLayout}>
      <Route path="new" component={ContractTypesForm}/>
      <Route path="employee" component={ChooseEmployeeForm}/>
      <Route path="contract" component={CreateContractForm}/>
    </Route>

    <Route path="popup" component={ChooseEmployeePopup}/>
    <Route path="verifypopup" component={VerificationPopup}/>

    <Redirect from="*" to="/cmp/auth/signin" />
  </Route>
);
