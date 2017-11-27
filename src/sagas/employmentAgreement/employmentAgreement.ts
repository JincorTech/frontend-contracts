import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
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
 * Verify contract
 */
const getContractState = (state) => state.employmentAgreement.employmentAgreement;

function* verifyContractIterator({ payload }): SagaIterator {
  try {
    const { verificationId, contractId } = yield select(getContractState);
    const { data } = yield call(post, `/api/contracts/${contractId}/actions/verify/`, {
      verificationId: verificationId,
      verificationCode: payload
    });

    yield put(verifyContract.success(data));
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
