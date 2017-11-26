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

/**
 * Action creators
 */
export const openPopup = createAction<void>(OPEN_POPUP);
export const closePopup = createAction<void>(CLOSE_POPUP);
export const fetchEmployees = createAsyncAction<void, Employee[]>(FETCH_EMPLOYEES);
export const chooseEmployee = createAction<string>(CHOOSE_EMPLOYEE);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  employees: [],
  popupIsOpened: false,
  chosenEmployeeId: null
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
  )
}, initialState);
