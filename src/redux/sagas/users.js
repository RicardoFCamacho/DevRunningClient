import ActionCreators from '../actionCreators'
import { put, call } from 'redux-saga/effects'

//export function* getUser(action){
export const getUser = ({ api }) => function* (action){
   const user = yield call(api.getUser, action.id)
   console.log('PASSEI')
   yield put(ActionCreators.getUserSuccess(user.data))
}


//action = false ou true
export const getUsers = ({ api }) => function* (action){
   const users = yield call(api.getUsers)
   yield put(ActionCreators.getUsersSuccess(users.data))
}

export const removeUser = ({ api }) => function* (action){
    yield call(api.removeUser, action.id)
    yield put(ActionCreators.removeUserSuccess(action.id))
}

export const updateUser = ({ api }) => function* updateUser(action){
  yield call(api.updateUser, action.user)
  yield put(ActionCreators.updateUserSuccess(action.user))
}