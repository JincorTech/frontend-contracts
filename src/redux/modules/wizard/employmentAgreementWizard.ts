import { createReducer, createAction } from '../../../utils/actions';
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
export const PREV_STEP = 'wizard/employmentAgreementWizard/PREV_STEP';
export const RESET_STATE = 'wizard/employmentAgreementWizard/RESET_STATE';

/**
 * Action creators
 */
export const nextStep = createAction<void>(NEXT_STEP);
export const prevStep = createAction<void>(PREV_STEP);
export const resetState = createAction<void>(RESET_STATE);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  currentStep: Step.ChooseContractType
});

export default createReducer<State>({
  [NEXT_STEP]: (state: State): State => (
    state.merge({ currentStep: state.currentStep + 1 })
  ),

  [PREV_STEP]: (state: State): State => (
    state.merge({ currentStep: state.currentStep === 0 ? state.currentStep : state.currentStep - 1 })
  ),

  [RESET_STATE]: (state: State): State => (
    state.merge({ ...initialState })
  )
}, initialState);
