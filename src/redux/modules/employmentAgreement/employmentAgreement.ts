import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  employees: Employee[]
  popupIsOpened: boolean
  chosenEmployeeId: string
  verifyPopupIsOpened: boolean
};

export type Employee = {
  id: string
  name: string
  email: string
}

/**
 * Constants
 */
export const OPEN_POPUP = 'employmentAgreement/employmentAgreement/OPEN_POPUP';
export const CLOSE_POPUP = 'employmentAgreement/employmentAgreement/CLOSE_POPUP';
export const FETCH_EMPLOYEES = 'employmentAgreement/employmentAgreement/FETCH_EMPLOYEES';
export const CHOOSE_EMPLOYEE = 'employmentAgreement/employmentAgreement/CHOOSE_EMPLOYEE';
export const POST_CONTRACT = 'employmentAgreement/employmentAgreement/POST_CONTRACT';
export const VERIFY_CONTRACT = 'employmentAgreement/employmentAgreement/VERIFY_CONTRACT';
export const CLOSE_VERIFY_POPUP = 'employmentAgreement/employmentAgreement/CLOSE_VERIFY_POPUP';

/**
 * Action creators
 */
export const openPopup = createAction<void>(OPEN_POPUP);
export const closePopup = createAction<void>(CLOSE_POPUP);
export const fetchEmployees = createAsyncAction<void, Employee[]>(FETCH_EMPLOYEES);
export const chooseEmployee = createAction<string>(CHOOSE_EMPLOYEE);
export const postContract = createAsyncAction<any, void>(POST_CONTRACT);
export const verifyContract = createAsyncAction<any, void>(VERIFY_CONTRACT);
export const closeVerifyPopup = createAction<void>(CLOSE_VERIFY_POPUP);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  employees: [],
  popupIsOpened: false,
  chosenEmployeeId: null,
  verifyPopupIsOpened: false
});

export default createReducer<State>({
  [OPEN_POPUP]: (state: State): State => (
    state.merge({ popupIsOpened: true })
  ),

  [CLOSE_POPUP]: (state: State): State => (
    state.merge({ popupIsOpened: false })
  ),

  [fetchEmployees.SUCCESS]: (state: State, { payload }: Action<Employee[]>): State => (
    state.merge({ employees: payload })
  ),

  [CHOOSE_EMPLOYEE]: (state: State, { payload }: Action<string>): State => (
    state.merge({ chosenEmployeeId: payload, popupIsOpened: false })
  ),

  [postContract.SUCCESS]: (state: State, {}: Action<void>): State => (
    state.merge({ verifyPopupIsOpened: true })
  ),

  [verifyContract.SUCCESS]: (state: State, {}: Action<void>): State => (
    state.merge({ verifyPopupIsOpened: false })
  ),

  [CLOSE_VERIFY_POPUP]: (state: State): State => (
    state.merge({ verifyPopupIsOpened: false })
  ),
}, initialState);
