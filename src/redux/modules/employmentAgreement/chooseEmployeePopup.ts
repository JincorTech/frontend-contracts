import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  searchText: string
};

/**
 * Constants
 */
export const CHANGE_SEARCH_TEXT = 'employmentAgreement/chooseEmployeePopup/CHANGE_SEARCH_TEXT';

/**
 * Action creators
 */
export const changeSearchText = createAction<string>(CHANGE_SEARCH_TEXT);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  searchText: ''
});

export default createReducer<State>({
  [CHANGE_SEARCH_TEXT]: (state: State, { payload }: Action<string>): State => (
    state.merge({ searchText: payload })
  )
}, initialState);
