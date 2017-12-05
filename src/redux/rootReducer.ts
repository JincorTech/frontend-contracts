import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';

import app from './modules/app/app';
import appWrapper from './modules/app/appWrapper';
import contractsPage from './modules/contracts/contractsPage';
import employmentAgreementWizard from './modules/wizard/employmentAgreementWizard';
import employmentAgreement from './modules/employmentAgreement/employmentAgreement';
import chooseEmployeePopup from './modules/employmentAgreement/chooseEmployeePopup';
import createContractForm from './modules/employmentAgreement/createContractForm';
import verification from './modules/verification/verification';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  loadingBar: loadingBarReducer,

  app: combineReducers({
    app,
    appWrapper
  }),

  common: combineReducers({
  }),

  contracts: combineReducers({
    contractsPage
  }),

  wizard: combineReducers({
    employmentAgreementWizard
  }),

  employmentAgreement: combineReducers({
    employmentAgreement,
    chooseEmployeePopup,
    createContractForm
  }),

  verification: combineReducers({
    verification
  })
});
