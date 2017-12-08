import * as React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import App from './containers/app/App';

import AppWrapper from './containers/app/AppWrapper';
import ContractsPage from './containers/contracts/ContractsPage';
import ContractsWrapper from './components/contracts/ContractsWrapper';
import WizardWrapper from './containers/wizard/WizardWrapper';
import employmentAgreementWizard from './containers/wizard/EmploymentAgreementWizard';

import CreateContractForm from './containers/employmentAgreement/CreateContractForm';
import ContractInfoWrapper from './containers/employmentAgreement/ContractInfoWrapper';

// named routes
export const routes = {
  base: '/contracts'
};

export default (
  <Route path="/contracts" component={App}>
    <IndexRedirect to="/contracts/app/contracts/list"/>

    <Route path="app" component={AppWrapper}>
      <Route path="contracts" component={ContractsWrapper}>
        <Route path="list" component={ContractsPage}/>
      </Route>

      <Route path="contract" component={ContractInfoWrapper}>
        <Route path=":contractId" component={CreateContractForm}/>
      </Route>

      <Route path="create" component={WizardWrapper}>
        <Route path="new" component={employmentAgreementWizard}/>
      </Route>

    </Route>
    <Redirect from="*" to="/cmp/auth/signin" />
  </Route>
);
