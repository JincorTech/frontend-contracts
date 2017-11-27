import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
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
  additionalClauses: string
};

/**
 * Constants
 */
export const CHANGE = 'employmentAgreement/createContractForm/CHANGE';

/**
 * Action creators
 */
export const change = createAction<{name: string, value: string}>(CHANGE);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
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
  additionalClauses: ''
});

export default createReducer<State>({
  [CHANGE]: (state: State, { payload }: Action<{name: string, value: string}>): State => (
    state.merge({ [payload.name]: payload.value })
  )
}, initialState);
