import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  employeeId: string
  contractDate: string,
  contractNumber: string,
  jobTitle: string,
  roleDescription: string,
  employmentType: string,
  agreementPeriod: string,
  startAgreementDate: string,
  endAgreementDate: string,
  salaryAmount: string,
  paymentsDay: string,
  additionalClauses: string,
  isSignedByEmployee: string,
  createdAt: string,
  signedAt: string,
  companyWalletAddress: string,
  employeeWalletAddress: string
};

/**
 * Constants
 */
export const CHANGE = 'employmentAgreement/createContractForm/CHANGE';
export const FETCH_CONTRACT = 'employmentAgreement/createContractForm/FETCH_CONTRACT';
export const FETCH_WALLETS = 'employmentAgreement/createContractForm/FETCH_WALLETS';
export const RESET_STATE = 'employmentAgreement/createContractForm/RESET_STATE';

/**
 * Action creators
 */
export const change = createAction<{name: string, value: string}>(CHANGE);
export const fetchContract = createAsyncAction<string, StateMap>(FETCH_CONTRACT);
export const fetchWallets = createAsyncAction<string, {companyWalletAddress: string, employeeWalletAddress: string}>(FETCH_WALLETS);
export const resetState = createAction<void>(RESET_STATE);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  employeeId: '',
  contractDate: '',
  contractNumber: '',
  jobTitle: '',
  roleDescription: '',
  employmentType: 'full',
  agreementPeriod: 'fixed',
  startAgreementDate: '',
  endAgreementDate: '',
  salaryAmount: '',
  paymentsDay: '',
  additionalClauses: '',
  isSignedByEmployee: '',
  createdAt: '',
  signedAt: '',
  companyWalletAddress: '',
  employeeWalletAddress: ''
});

export default createReducer<State>({
  [CHANGE]: (state: State, { payload }: Action<{name: string, value: string}>): State => (
    state.merge({ [payload.name]: payload.value })
  ),

  [fetchContract.SUCCESS]: (state: State, { payload }: Action<StateMap>): State => (
    state.merge({ ...payload })
  ),

  [fetchWallets.SUCCESS]: (state: State, { payload }: Action<{companyWalletAddress: string, employeeWalletAddress: string}>): State => (
    state.merge({ companyWalletAddress: payload.companyWalletAddress, employeeWalletAddress: payload.employeeWalletAddress })
  ),

  [RESET_STATE]: (state: State, { payload }: Action<{name: string, value: string}>): State => (
    state.merge({ ...initialState })
  ),
}, initialState);
