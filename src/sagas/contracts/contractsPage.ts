import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { get } from '../../apiMock';
import { Contract } from '../../redux/modules/contracts/contractsPage';

import {
  fetchContracts
} from '../../redux/modules/contracts/contractsPage';

import {
  FETCH_CONTRACTS
} from '../../redux/modules/contracts/contractsPage';

/**
 * Fetch contracts
 */
function* fetchContractsIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/contracts');
    yield put(fetchContracts.success(data));
  } catch (e) {
    yield put(fetchContracts.failure(e));
  }
}

function* fetchContractsSaga(): SagaIterator {
  yield takeLatest(
    fetchContracts.REQUEST,
    fetchContractsIterator
  );
}

/**
 * App saga
 */
export default function*(): SagaIterator {
  yield [
    fork(fetchContractsSaga)
  ];
}
