import { call, put, takeEvery } from 'redux-saga/effects';
import { userAddAPI } from '../api';
import { userAddAction, userAddCompletedAction } from '../actions'

export function* userSaga() {
  yield takeEvery(userAddAction, userAdd);
}

function* userAdd({ payload }: ReturnType<typeof userAddAction>) {
  const response = yield call(userAddAPI, payload);
  console.log('response', response.data);
  yield put(userAddCompletedAction(response));
}