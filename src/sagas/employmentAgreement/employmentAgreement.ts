import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { get, post } from '../../utils/api';
import { transformContractBodyPost, transformEmployeesGet } from '../../helpers/common/api';
import BasePath from '../../config';

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
    const { data } = yield call(get, BasePath.CompaniesApiPath, '/employee/colleagues/');
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
    const { data } = yield call(post, BasePath.WalletsApiPath, '/contracts/', transformContractBodyPost(payload));
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
    const { data } = yield call(post, BasePath.WalletsApiPath, `/contracts/${payload}/actions/sign/initiate/`, {});
    yield put(signContract.success(data));
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
