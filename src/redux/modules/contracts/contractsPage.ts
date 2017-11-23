import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  contracts: Contract[]
};

export type Contract = {
  name: string
  date: Date
  signed: boolean
}

/**
 * Constants
 */
export const FETCH_CONTRACTS = 'contracts/contractsPage/FETCH_CONTRACTS';

/**
 * Action creators
 */
export const fetchContracts = createAsyncAction<void, { contracts: Contract[] }>(FETCH_CONTRACTS);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  contracts: []
});

export default createReducer<State>({
  [fetchContracts.SUCCESS]: (state: State, { payload }: Action<{ contracts: Contract[] }>): State => (
    state.merge({ contracts: payload })
  )
}, initialState);
