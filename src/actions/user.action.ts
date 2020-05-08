import { IFields } from '../components/common'

export const loginAction = (params: IFields) => ({
  type: "LOGIN_USER",
  payload: params,
});

export const updateChannel = (params: any) => ({
  type: "UPDATE_CHANNEL",
  payload: params
})

export const addUsers = (params: any) => ({
  type: "ADD_USERS",
  payload: params
})

export const updateRoom = (params: any) => ({
  type: "UPDATE_ROOM",
  payload: params
})