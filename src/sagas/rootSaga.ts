import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import appSaga from './app/app';
import appWrapperSaga from './app/appWrapper';
import profileCardSaga from './app/profileCard';
import contractsPageSaga from './contracts/contractsPage';
import employmentAgreement from './employmentAgreement/employmentAgreement';
import createContractForm from './employmentAgreement/createContractForm';
import verification from './verification/verification';

export default function*(): SagaIterator {
  yield [
    fork(formActionSaga),
    fork(appSaga),
    fork(appWrapperSaga),
    fork(contractsPageSaga),
    fork(employmentAgreement),
    fork(createContractForm),
    fork(verification),
    fork(profileCardSaga)
  ];
}
