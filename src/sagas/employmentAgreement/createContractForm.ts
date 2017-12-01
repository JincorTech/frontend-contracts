import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { get, post } from '../../apiMock';
import { transformContractBodyGet, EthCurrencyName, CorporateWalletType } from '../../helpers/common/api';
import { getEmployeeById } from '../../helpers/common/store';

import {
  fetchContract,
  fetchWallets
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
 * Fetch wallets
 */
const getContractState = (state) => state.employmentAgreement.employmentAgreement;

function* fetchWalletsIterator({ payload }): SagaIterator {
  try {
    //get corporate wallet
    const { data } = yield call(get, `/api/wallets/`);
    const corporateEthWallet = data.find((wallet) => {
      return wallet.type === CorporateWalletType && wallet.currency === EthCurrencyName;
    });

    //get employee wallet
    const { chosenEmployeeId, employees } = yield select(getContractState);
    const employee = getEmployeeById(employees, chosenEmployeeId);
    const employeeEthWallet = employee.wallets.find((wallet) => wallet.currency === EthCurrencyName);

    yield put(fetchWallets.success({companyWalletAddress: corporateEthWallet.address, employeeWalletAddress: employeeEthWallet.address}));
  } catch (e) {
    yield put(fetchWallets.failure(e));
  }
}

function* fetchWalletsSaga(): SagaIterator {
  yield takeLatest(
    fetchWallets.REQUEST,
    fetchWalletsIterator
  );
}

/**
 * Contract form saga
 */
export default function*(): SagaIterator {
  yield [
    fork(fetchContractSaga),
    fork(fetchWalletsSaga)
  ];
}
