import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { get, post } from '../../apiMock';
import { transformContractBodyPost, transformEmployeesGet } from '../../helpers/common/api';

import {
  fetchEmployees,
  postContract,
  signContract
} from '../../redux/modules/employmentAgreement/employmentAgreement';

import {
  fetchContract
} from '../../redux/modules/employmentAgreement/createContractForm';

/**
 * Fetch employees
 */
function* fetchEmployeesIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/employee/colleagues/');
    yield put(fetchEmployees.success(transformEmployeesGet(data)));
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
    const { data } = yield call(post, '/api/contracts/', transformContractBodyPost(payload));
    yield put(postContract.success(data));
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
 * Sign contract
 */
function* signContractIterator({ payload }): SagaIterator {
  try {
    const { data } = yield call(post, `/api/contracts/${payload}/actions/sign/`, {});
    yield put(signContract.success(data));
    yield put(fetchContract(payload));
  } catch (e) {
    yield put(signContract.failure(e));
  }
}

function* signContractSaga(): SagaIterator {
  yield takeLatest(
    signContract.REQUEST,
    signContractIterator
  );
}

/**
 * Employment agreement saga
 */
export default function*(): SagaIterator {
  yield [
    fork(fetchEmployeesSaga),
    fork(postContractSaga),
    fork(signContractSaga)
  ];
}
