import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { get, post } from '../../apiMock';
import { transformContractBodyGet } from '../../helpers/common/api';

import {
  fetchContract
} from '../../redux/modules/employmentAgreement/createContractForm';

/**
 * Fetch contract
 */
function* fetchContractIterator({ payload }): SagaIterator {
  try {
    const { data } = yield call(get, `/api/contracts/${payload}/`);
    yield put(fetchContract.success(transformContractBodyGet(data)));
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
