import * as TYPE from '../constants';

export interface User {
  name: '',
  email: '',
};

export interface BaseAction {
  type: string;
  payload: any;
}

export const UserReducer = (
  state: User = { name: '', email: '' },
  action: BaseAction
) => {
  switch (action.type) {
    case TYPE.ADD_USER:
      return action.payload;
  }

  return state;
};