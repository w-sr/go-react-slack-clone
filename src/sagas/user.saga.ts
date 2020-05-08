import { call, put, takeEvery } from 'redux-saga/effects';
import { userAddAPI } from '../api';
import { loginAction } from '../actions';

export function* userSaga() {
  yield takeEvery("LOGIN_USER", userAdd);
}

function* userAdd({ payload }: ReturnType<typeof loginAction>) {
  try {
    yield call(userAddAPI, payload);
    yield put({ type: 'LOGIN_USER_COMPLETE', payload });
  } catch (error) {
    console.log(error)
  }
}