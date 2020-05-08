import { combineReducers } from 'redux';
import { IFields } from '../components/common'
import {
  UserReducer,
} from './user.reducer';

export interface State {
  currentUser: IFields;
}

export const rootReducers = combineReducers<State>({
  currentUser: UserReducer,
});