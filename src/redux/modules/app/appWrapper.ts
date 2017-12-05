import { createReducer, Action, createAsyncAction } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  user: User
};

export type User = {
  id: string
  profile: UserProfile
  contacts: UserContacts
  company: UserCompany
};

export type UserProfile = {
  name: string
  firstName: string
  lastName: string
  position: string
  avatar?: string
};

export type UserContacts = {
  email: string
  phone?: string
};

export type UserCompany = {
  id: string
  legalName: string
  profile: {
    country: {
      id: string
      name: string
    },
    formattedAddress: string
    type: string
    picture: string
  }
};

/**
 * Constants
 */
export const FETCH_USER = 'app/appWrapper/FETCH_USER';

/**
 * Action creators
 */
export const fetchUser = createAsyncAction<void, User>(FETCH_USER);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  user: {
    id: '',
    profile: {
      name: '',
      firstName: '',
      lastName: '',
      position: '',
      avatar: ''
    },
    contacts: {
      email: '',
      phone: ''
    },
    company: {
      id: '',
      legalName: '',
      profile: {
        country: {
          id: '',
          name: ''
        },
        formattedAddress: '',
        type: '',
        picture: ''
      }
    }
  }
});

export default createReducer<State>({
  [fetchUser.SUCCESS]: (state: State, { payload }: Action<User>): State => (
    state.merge({ user: payload })
  )
}, initialState);
