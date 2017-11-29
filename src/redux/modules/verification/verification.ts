import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  verificationCode: string
  verificationFinished: boolean
  verifyError: string
  inProgress: boolean
};

/**
 * Constants
 */
export const CHANGE_VERIFICATION_CODE = 'verification/verification/CHANGE_VERIFICATION_CODE';
export const VERIFY_CONTRACT = 'verification/verification/VERIFY_CONTRACT';
export const RESET_STATE = 'verification/verification/RESET_STATE';

/**
 * Action creators
 */
export const changeVerificationCode = createAction<string>(CHANGE_VERIFICATION_CODE);
export const verifyContract = createAsyncAction<any, void>(VERIFY_CONTRACT);
export const resetState = createAction<string>(RESET_STATE);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  verificationCode: '',
  verificationFinished: false,
  verifyError: '',
  inProgress: false
});

export default createReducer<State>({
  [CHANGE_VERIFICATION_CODE]: (state: State, { payload }: Action<string>): State => (
    state.merge({ verificationCode: payload })
  ),

  [verifyContract.REQUEST]: (state: State, {}: Action<void>): State => (
    state.merge({ inProgress: true })
  ),

  [verifyContract.SUCCESS]: (state: State, {}: Action<void>): State => (
    state.merge({ verificationFinished: true, verifyError: '', inProgress: false })
  ),

  [verifyContract.FAILURE]: (state: State, { payload }: Action<Error>): State => (
    state.merge({ verificationFinished: true, verifyError: payload.message, inProgress: false })
  ),

  [RESET_STATE]: (state: State, { payload }: Action<string>): State => (
    state.merge({ ...initialState })
  )
}, initialState);
