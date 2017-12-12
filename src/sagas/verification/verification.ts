import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { post } from '../../utils/api';
import BasePath from '../../config';

import {
  verify,
  VerifyType
} from '../../redux/modules/verification/verification';

/**
 * Verify
 */
const getContractState = (state) => state.employmentAgreement.employmentAgreement;

const getApiPath = (contractId: string, type: VerifyType) => {
  if (type === VerifyType.DeployContract) {
    return `/contracts/${contractId}/actions/verify/`;
  } else if (type === VerifyType.SignContract) {
    return `/contracts/${contractId}/actions/sign/verify`;
  } else {
    return '';
  }
};

function* verifyIterator({ payload }): SagaIterator {
  try {
    const { verificationId, contractId } = yield select(getContractState);
    const { statusCode } = yield call(post, BasePath.WalletsApiPath, getApiPath(contractId, payload.type), {
      verificationId: verificationId,
      verificationCode: payload.code
    });

    yield put(verify.success(statusCode));
  } catch (e) {
    yield put(verify.failure(e));
  }
}

function* verifySaga(): SagaIterator {
  yield takeLatest(
    verify.REQUEST,
    verifyIterator
  );
}

/**
 * Verification saga
 */
export default function*(): SagaIterator {
  yield [
    fork(verifySaga)
  ];
}
