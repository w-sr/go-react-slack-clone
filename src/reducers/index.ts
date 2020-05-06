import { combineReducers } from 'redux';
import {
  User,
  UserReducer,
} from './user.reducer';

export interface State {
  numberCollection: User;
}

export const rootReducers = combineReducers<State>({
  numberCollection: UserReducer,
});