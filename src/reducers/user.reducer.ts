import { Action, Reducer } from "redux";

export interface ObjectArray extends Array<any> {
  [index: number]: any
}

export interface ChatState {
  name: string;
  email: string;
  endUserName: string;
  currentRoom: string;
  currentChannel: string;
  subscribedChannels: ObjectArray;
  subscribedUsers: ObjectArray;
}

export const initialState: ChatState = {
  name: '',
  email: '',
  endUserName: '',
  currentRoom: '',
  currentChannel: '',
  subscribedChannels: [],
  subscribedUsers: [],
}

export interface DispatchAction extends Action {
  type: string;
  payload: any;
}

export const ChatReducer: Reducer<ChatState, DispatchAction> = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER_COMPLETE":

      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email
      };

    case "ADD_USERS":
      return {
        ...state,
        subscribedUsers: [...state.subscribedUsers, action.payload]
      };

    case "UPDATE_CHANNEL":
      return {
        ...state,
        subscribedChannels: [...state.subscribedChannels, action.payload]
      };

    case "UPDATE_ROOM":
      return {
        ...state,
        currentRoom: action.payload.currentRoom,
        currentChannel: action.payload.currentChannel,
        endUserName: action.payload.endUserName
      }
    default:
      return state;
  }
};