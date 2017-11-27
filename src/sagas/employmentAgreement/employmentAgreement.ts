import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { get, post } from '../../apiMock';
import { transformContractBody } from '../../helpers/common/api';

import {
  fetchEmployees,
  postContract,
  verifyContract
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
 * Post contract
 */
function* postContractIterator({ payload }): SagaIterator {
  try {
    const { data } = yield call(post, '/api/contracts/', transformContractBody(payload));
    yield put(postContract.success(data.verificationId));
  } catch (e) {
    yield put(postContract.failure(e));
  }
}

function* postContractSaga(): SagaIterator {
  yield takeLatest(
    postContract.REQUEST,
    postContractIterator
  );
}

/**
 * Verify contract
 */
function* verifyContractIterator(): SagaIterator {
  try {
    // const { data } = yield call(post, '/api/contracts/{CONTRACT_ID}');
    yield put(verifyContract.success());
  } catch (e) {
    yield put(verifyContract.failure(e));
  }
}

function* verifyContractSaga(): SagaIterator {
  yield takeLatest(
    verifyContract.REQUEST,
    verifyContractIterator
  );
}

/**
 * Employment agreement saga
 */
export default function*(): SagaIterator {
  yield [
    fork(fetchEmployeesSaga),
    fork(postContractSaga),
    fork(verifyContractSaga)
  ];
}
