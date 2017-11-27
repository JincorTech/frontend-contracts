import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import appSaga from './app/app';
import contractsPageSaga from './contracts/contractsPage';
import employmentAgreement from './employmentAgreement/employmentAgreement';
import createContractForm from './employmentAgreement/createContractForm';

export default function*(): SagaIterator {
  yield [
    fork(appSaga),
    fork(contractsPageSaga),
    fork(employmentAgreement),
    fork(createContractForm)
  ];
}
