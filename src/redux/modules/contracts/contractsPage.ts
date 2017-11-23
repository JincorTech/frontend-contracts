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
  sorting: SortingType
  filtering: FilteringType
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
  sorting: SortingType.ByDate,
  filtering: FilteringType.All
});

const getSortingComparator = (sorting: SortingType) => {
  if (sorting === SortingType.ByDate) {
    return (a: Contract, b: Contract) => a.date < b.date ? 1 : -1;
  } else {
    return (a: Contract, b: Contract) => a.name < b.name ? 1 : -1;
  }
}

const getSortedContracts = (contracts: Contract[], sorting: SortingType) => {
  return contracts.sort(getSortingComparator(sorting));
}

const getFilteredContracts = (contracts: Contract[], filtering: FilteringType) => {
  if (filtering === FilteringType.Unsigned) {
    return contracts.filter((contract: Contract) => !contract.signed);
  } else {
    return contracts;
  }
}

export default createReducer<State>({
  [fetchContracts.SUCCESS]: (state: State, { payload }: Action<Contract[]>): State => (
    state.merge({ contracts: getSortedContracts(payload, SortingType.ByDate) })
  ),

  [CHANGE_SORTING]: (state: State, { payload }: Action<SortingType>): State => (
    state.merge({
      contracts: getSortedContracts(Array.from(state.contracts), payload),
      sorting: payload
    })
  ),

  [CHANGE_FILTERING]: (state: State, { payload }: Action<FilteringType>): State => (
    state.merge({
      contracts: getFilteredContracts(state.contracts, payload),
      filtering: payload
    })
  ),
}, initialState);
