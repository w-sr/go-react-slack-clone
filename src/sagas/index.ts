import { all, fork } from 'redux-saga/effects';
import { userSaga } from './user.saga';

export const rootSaga = function* root() {
  yield all([fork(userSaga)]);
};
