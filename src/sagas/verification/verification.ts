import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { post } from '../../utils/api';
import BasePath from '../../config';

import {
  verifyContract
} from '../../redux/modules/verification/verification';

/**
 * Verify contract
 */
const getContractState = (state) => state.employmentAgreement.employmentAgreement;

function* verifyContractIterator({ payload }): SagaIterator {
  try {
    const { verificationId, contractId } = yield select(getContractState);
    const { status, data } = yield call(post, BasePath.WalletsApiPath, `/contracts/${contractId}/actions/verify/`, {
      verificationId: verificationId,
      verificationCode: payload
    });

    if (status !== 200) {
      throw new Error('Wrong verification code');
    }

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
 * Verification saga
 */
export default function*(): SagaIterator {
  yield [
    fork(verifyContractSaga)
  ];
}
