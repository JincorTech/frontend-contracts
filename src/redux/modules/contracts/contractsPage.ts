import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export enum SortingType {
  ByDate,
  ByName
}

export enum FilteringType {
  Unsigned,
  All
}

export type StateMap = {
  contracts: Contract[]
  spinner: boolean
  sorting: SortingType
  filtering: FilteringType
};

export enum ContractStatus {
  Draft,
  DeployPending,
  DeployFailed,
  Deployed,
  SignPending,
  SignFailed,
  Signed
}

export type Contract = {
  id: string
  userId: string
  userName: string
  userAvatar: string
  createdAt: Date
  signedAt: Date
  status: ContractStatus
};

/**
 * Constants
 */
export const FETCH_CONTRACTS = 'contracts/contractsPage/FETCH_CONTRACTS';
export const CHANGE_SORTING = 'contracts/contractsPage/CHANGE_SORTING';
export const CHANGE_FILTERING = 'contracts/contractsPage/CHANGE_FILTERING';

/**
 * Action creators
 */
export const fetchContracts = createAsyncAction<void, Contract[]>(FETCH_CONTRACTS);
export const changeSorting = createAction<SortingType>(CHANGE_SORTING);
export const changeFiltering = createAction<FilteringType>(CHANGE_FILTERING);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  contracts: [],
  spinner: false,
  sorting: SortingType.ByDate,
  filtering: FilteringType.All
});

const getSortingComparator = (sorting: SortingType) => {
  if (sorting === SortingType.ByDate) {
    return (a: Contract, b: Contract) => a.createdAt < b.createdAt ? 1 : -1;
  } else {
    return (a: Contract, b: Contract) => a.userName > b.userName ? 1 : -1;
  }
};

const getSortedContracts = (contracts: Contract[], sorting: SortingType) => {
  return contracts.sort(getSortingComparator(sorting));
};

export default createReducer<State>({
  [fetchContracts.REQUEST]: (state: State, { payload }: Action<any>): State => (
    state.merge({ spinner: true })
  ),

  [fetchContracts.SUCCESS]: (state: State, { payload }: Action<Contract[]>): State => (
    state.merge({ contracts: getSortedContracts(payload, SortingType.ByDate), spinner: false })
  ),

  [fetchContracts.FAILURE]: (state: State, { payload }: Action<any>): State => (
    state.merge({ spinner: false })
  ),

  [CHANGE_SORTING]: (state: State, { payload }: Action<SortingType>): State => (
    state.merge({
      contracts: getSortedContracts(Array.from(state.contracts), payload),
      sorting: payload
    })
  ),

  [CHANGE_FILTERING]: (state: State, { payload }: Action<FilteringType>): State => (
    state.merge({
      filtering: payload
    })
  )
}, initialState);
