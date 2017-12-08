import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export enum FormDates {
  ContractDate = 1,
  StartDate,
  EndDate
}

export type StateMap = {
  employees: Employee[]
  employeesWaiting: boolean
  popupIsOpened: boolean
  activeDatePopup: FormDates
  chosenEmployeeId: string
  verifyPopupIsOpened: boolean
  verificationId: string,
  contractId: string,
  createdAt: string,
  waiting: boolean
};

export type Wallet = {
  // TODO Add wallet type enum
  type: string
  address: string
  balance: string
  // TODO Add currencies enum
  currency: string
  created_at: string,
  // TODO Fix type
  transactions: any
};

export type Employee = {
  id: string
  name: string
  email: string
  avatar: string
  wallets: Wallet[]
};

/**
 * Constants
 */
export const OPEN_POPUP = 'employmentAgreement/employmentAgreement/OPEN_POPUP';
export const CLOSE_POPUP = 'employmentAgreement/employmentAgreement/CLOSE_POPUP';
export const OPEN_DATE_POPUP = 'employmentAgreement/employmentAgreement/OPEN_DATE_POPUP';
export const CLOSE_DATE_POPUP = 'employmentAgreement/employmentAgreement/CLOSE_DATE_POPUP';
export const FETCH_EMPLOYEES = 'employmentAgreement/employmentAgreement/FETCH_EMPLOYEES';
export const CHOOSE_EMPLOYEE = 'employmentAgreement/employmentAgreement/CHOOSE_EMPLOYEE';
export const POST_CONTRACT = 'employmentAgreement/employmentAgreement/POST_CONTRACT';
export const SIGN_CONTRACT = 'employmentAgreement/employmentAgreement/SIGN_CONTRACT';
export const CLOSE_VERIFY_POPUP = 'employmentAgreement/employmentAgreement/CLOSE_VERIFY_POPUP';
export const RESET_STATE = 'employmentAgreement/employmentAgreement/RESET_STATE';

/**
 * Action creators
 */
export const openPopup = createAction<void>(OPEN_POPUP);
export const closePopup = createAction<void>(CLOSE_POPUP);
export const openDatePopup = createAction<FormDates>(OPEN_DATE_POPUP);
export const closeDatePopup = createAction<void>(CLOSE_DATE_POPUP);
export const fetchEmployees = createAsyncAction<void, Employee[]>(FETCH_EMPLOYEES);
export const chooseEmployee = createAction<string>(CHOOSE_EMPLOYEE);
export const postContract = createAsyncAction<any, any>(POST_CONTRACT);
export const signContract = createAsyncAction<string, void>(SIGN_CONTRACT);
export const closeVerifyPopup = createAction<void>(CLOSE_VERIFY_POPUP);
export const resetState = createAction<void>(RESET_STATE);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  employees: [],
  employeesWaiting: false,
  popupIsOpened: false,
  activeDatePopup: null,
  chosenEmployeeId: null,
  verifyPopupIsOpened: false,
  verificationId: '',
  contractId: '',
  createdAt: '',
  waiting: false
});

export default createReducer<State>({
  [OPEN_POPUP]: (state: State): State => (
    state.merge({ popupIsOpened: true })
  ),

  [CLOSE_POPUP]: (state: State): State => (
    state.merge({ popupIsOpened: false })
  ),

  [OPEN_DATE_POPUP]: (state: State, { payload }: Action<FormDates>): State => (
    state.merge({ activeDatePopup: payload })
  ),

  [CLOSE_DATE_POPUP]: (state: State): State => (
    state.merge({ activeDatePopup: null })
  ),

  [fetchEmployees.REQUEST]: (state: State, { payload }: Action<any>): State => (
    state.merge({ employeesWaiting: true })
  ),

  [fetchEmployees.SUCCESS]: (state: State, { payload }: Action<Employee[]>): State => (
    state.merge({ employees: payload, employeesWaiting: false })
  ),

  [fetchEmployees.FAILURE]: (state: State, { payload }: Action<any>): State => (
    state.merge({ employeesWaiting: false })
  ),

  [CHOOSE_EMPLOYEE]: (state: State, { payload }: Action<string>): State => (
    state.merge({ chosenEmployeeId: payload, popupIsOpened: false })
  ),

  [postContract.REQUEST]: (state: State, { payload }: Action<any>): State => (
    state.merge({ waiting: true })
  ),

  [postContract.SUCCESS]: (state: State, { payload }: Action<any>): State => (
    state.merge({ verifyPopupIsOpened: true, waiting: false, ...payload })
  ),

  [signContract.REQUEST]: (state: State, {}: Action<void>): State => (
    state.merge({ waiting: true })
  ),

  [signContract.SUCCESS]: (state: State, {}: Action<void>): State => (
    state.merge({ waiting: false })
  ),

  [CLOSE_VERIFY_POPUP]: (state: State): State => (
    state.merge({ verifyPopupIsOpened: false })
  ),

  [RESET_STATE]: (state: State): State => (
    state.merge({ ...initialState })
  )
}, initialState);
