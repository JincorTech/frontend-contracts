import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export enum Step {
  ChooseContractType,
  ChooseEmployeeForm,
  CreateContractForm
}

export type StateMap = {
  currentStep: Step
};

/**
 * Constants
 */
export const NEXT_STEP = 'wizard/employmentAgreementWizard/NEXT_STEP';

/**
 * Action creators
 */
export const nextStep = createAction<void>(NEXT_STEP);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  currentStep: Step.ChooseContractType
});

export default createReducer<State>({
  [NEXT_STEP]: (state: State): State => (
    state.merge({ currentStep: state.currentStep + 1 })
  )
}, initialState);
