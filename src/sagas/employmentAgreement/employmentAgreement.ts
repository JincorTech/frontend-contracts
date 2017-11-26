import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { get } from '../../apiMock';

import {
  fetchEmployees
} from '../../redux/modules/employmentAgreement/employmentAgreement';

/**
 * Fetch employees
 */
function* fetchEmployeesIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/employees');
    yield put(fetchEmployees.success(data));
  } catch (e) {
    yield put(fetchEmployees.failure(e));
  }
}

function* fetchEmployeesSaga(): SagaIterator {
  yield takeLatest(
    fetchEmployees.REQUEST,
    fetchEmployeesIterator
  );
}

/**
 * Employment agreement saga
 */
export default function*(): SagaIterator {
  yield [
    fork(fetchEmployeesSaga)
  ];
}
