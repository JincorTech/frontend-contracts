import { SagaIterator } from 'redux-saga';
import { takeLatest, takeEvery, call, put, select, fork } from 'redux-saga/effects';
import { initialize } from 'redux-form';
import { Action } from '../../utils/actions';
import { put as putFunc } from '../../utils/api';
import BasePath from '../../config';

import {
  changePassword, updateProfile,
  changeView, closeProfileCard,
  LOGOUT, FETCH_PROFILE, setAvatar
} from '../../redux/modules/app/profileCard';
import { fetchUser } from '../../redux/modules/app/appWrapper';
import { logout } from '../../redux/modules/app/app';

import { PasswordFields, ProfileFields } from '../../redux/modules/app/profileCard';

const getUserState = state => state.app.appWrapper.user.profile;

function* getProfileIterator(): SagaIterator {
  try {
    const { avatar, firstName, lastName, position } = yield select(getUserState);

    yield put(initialize('cardUpdateProfile', { avatar: '', firstName, lastName, position }, false));
    yield put(setAvatar(avatar));
  } catch (e) {
    yield call(console.log, e);
  }
}

function* getProfileSaga(): SagaIterator {
  yield takeLatest(
    FETCH_PROFILE,
    getProfileIterator
  );
}

const getCompanyState = state => state.app.appWrapper.user.company;

function* changePasswordIterator({ payload }: Action<PasswordFields>): SagaIterator {
  const { id } = yield select(getCompanyState);
  const body = { companyId: id, ...payload };

  try {
    yield call(putFunc, BasePath.CompaniesApiPath, '/employee/changePassword/', body);
    yield put(changePassword.success());
    yield put(changeView('buttons'));
  } catch (e) {
    yield put(changePassword.failure());
  }
}

function* changePasswordSaga(): SagaIterator {
  yield takeLatest(
    changePassword.REQUEST,
    changePasswordIterator
  );
}

function* updateProfileIterator({ payload }: Action<ProfileFields>): SagaIterator {
  const body = { profile: { ...payload } };

  try {
    yield call(putFunc, BasePath.CompaniesApiPath, '/employee/me/', body);
    yield put(updateProfile.success());
    yield put(fetchUser());
    yield put(changeView('buttons'));
  } catch (e) {
    yield put(updateProfile.failure(e));
  }
}

function* updateProfileSaga(): SagaIterator {
  yield takeLatest(
    updateProfile.REQUEST,
    updateProfileIterator
  );
}

function* logoutIterator(): SagaIterator {
  yield put(logout());
  yield put(closeProfileCard());
}

function* logoutSaga(): SagaIterator {
  yield takeEvery(
    LOGOUT,
    logoutIterator
  );
}

export default function*(): SagaIterator {
  yield [
    fork(changePasswordSaga),
    fork(getProfileSaga),
    fork(updateProfileSaga),
    fork(logoutSaga)
  ];
}
