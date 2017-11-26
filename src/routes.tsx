import * as React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import App from './containers/app/App';

import AppWrapper from './components/app/AppWrapper';
import ContractsPage from './containers/contracts/ContractsPage';
import WizardWrapper from './containers/wizard/WizardWrapper';
import employmentAgreementWizard from "./containers/wizard/EmploymentAgreementWizard";

import ContractTypesForm from './components/wizard/ContractTypesForm';
import ChooseEmployeeForm from './containers/employmentAgreement/ChooseEmployeeForm';
import ChooseEmployeePopup from './containers/employmentAgreement/ChooseEmployeePopup';
import CreateContractForm from './containers/employmentAgreement/CreateContractForm';
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

    <Route path="create" component={WizardWrapper}>
      <Route path="new" component={employmentAgreementWizard}/>
      <Route path="type" component={ContractTypesForm}/>
      <Route path="employee" component={ChooseEmployeeForm}/>
      <Route path="contract" component={CreateContractForm}/>
    </Route>

    <Route path="popup" component={ChooseEmployeePopup}/>
    <Route path="verifypopup" component={VerificationPopup}/>

    <Redirect from="*" to="/cmp/auth/signin" />
  </Route>
);
