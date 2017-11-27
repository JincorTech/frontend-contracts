import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { get, post } from '../../apiMock';
import { transformContractBodyPost } from '../../helpers/common/api';

import {
  fetchContract
} from '../../redux/modules/employmentAgreement/createContractForm';

/**
 * Fetch contract
 */
function* fetchContractIterator({ payload }): SagaIterator {
  try {
    const { data } = yield call(get, `/api/contracts/6174b0f53573874343a4d915d4f5b6876a9a15e5/`);
    yield put(fetchContract.success(data));
  } catch (e) {
    yield put(fetchContract.failure(e));
  }
}

function* fetchContractSaga(): SagaIterator {
  yield takeLatest(
    fetchContract.REQUEST,
    fetchContractIterator
  );
}

/**
 * Contract form saga
 */
export default function*(): SagaIterator {
  yield [
    fork(fetchContractSaga)
  ];
}
