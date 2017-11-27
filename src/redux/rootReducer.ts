import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';

import app from './modules/app/app';
import contractsPage from './modules/contracts/contractsPage';
import employmentAgreementWizard from './modules/wizard/employmentAgreementWizard';
import employmentAgreement from './modules/employmentAgreement/employmentAgreement';
import chooseEmployeePopup from './modules/employmentAgreement/chooseEmployeePopup';
import createContractForm from './modules/employmentAgreement/createContractForm';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  loadingBar: loadingBarReducer,

  app: combineReducers({
    app
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
  })
});
