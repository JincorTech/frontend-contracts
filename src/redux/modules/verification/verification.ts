import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  verificationCode: string
  isVerified: boolean
};

/**
 * Constants
 */
export const CHANGE_VERIFICATION_CODE = 'verification/verification/CHANGE_VERIFICATION_CODE';
export const VERIFY_CONTRACT = 'verification/verification/VERIFY_CONTRACT';

/**
 * Action creators
 */
export const changeVerificationCode = createAction<string>(CHANGE_VERIFICATION_CODE);
export const verifyContract = createAsyncAction<any, void>(VERIFY_CONTRACT);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  verificationCode: '',
  isVerified: false
});

export default createReducer<State>({
  [CHANGE_VERIFICATION_CODE]: (state: State, { payload }: Action<string>): State => (
    state.merge({ verificationCode: payload })
  ),

  [verifyContract.SUCCESS]: (state: State, {}: Action<void>): State => (
    state.merge({ isVerified: true })
  )
}, initialState);
