import * as TYPE from '../constants';

import { IFields } from '../components/common'

export const userAddAction = (params: IFields) => ({
  type: TYPE.ADD_USER,
  payload: params,
});

export const userAddCompletedAction = (params: IFields) => ({
  type: TYPE.ADD_USER_SUCCESS,
  payload: params,
});