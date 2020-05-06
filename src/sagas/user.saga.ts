import { call, put, takeEvery } from 'redux-saga/effects';
import { userAddAPI } from '../api';
import { userAddAction } from '../actions';
import * as TYPE from '../constants';

export function* userSaga() {
  yield takeEvery(TYPE.ADD_USER, userAdd);
}

function* userAdd() {
  const response = yield call(userAddAPI);
  console.log('response', response);
  yield put(userAddAction());
}