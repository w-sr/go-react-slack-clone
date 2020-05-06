import * as TYPE from '../constants';
import { IFields } from '../components/common'

export interface BaseAction {
  type: string;
  payload: any;
}

export const UserReducer = (
  state: IFields = {
    name: {
      id: 'name',
      value: ''
    },
    email: {
      id: 'name',
      value: ''
    }
  },
  action: BaseAction
) => {
  switch (action.type) {
    case TYPE.ADD_USER_SUCCESS:
      return action.payload;
  }

  return state;
};