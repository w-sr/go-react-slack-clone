import { combineReducers } from 'redux';
import {
  ChatReducer,
} from './user.reducer';

export const rootReducers = combineReducers({
  ChatReducer,
});