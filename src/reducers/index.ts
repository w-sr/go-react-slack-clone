import { combineReducers } from 'redux';
import { IFields } from '../components/common'
import {
  UserReducer,
} from './user.reducer';

export interface State {
  numberCollection: IFields;
}

export const rootReducers = combineReducers<State>({
  numberCollection: UserReducer,
});