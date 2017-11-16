import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import appSaga from './app/app';

export default function*(): SagaIterator {
  yield [
    fork(appSaga)
  ];
}
