import { takeLatest, all, put } from 'redux-saga/effects'
import { Types } from '../actionCreators'
import ActionCreators from '../actionCreators'
import { getCategories, getCategory, createCategory, removeCategory, updateCategory } from './categories'
import { getRuns, createRun, removeRun } from './runs'
import { auth, login, destroyAuth, updateProfile, createProfile } from './auth'
import { getUsers, getUser, removeUser, updateUser } from './users'
import Api from './../../service/Api.js'

//Servidor roda na porta 3001
export default function* rootSaga() {
    const devURL = 'http://localhost:3001'
    const prodURL = 'http://api.devpleno.com'
    const baseURL = process.env.NODE_ENV === 'development' ? devURL : prodURL
    const api = new Api(baseURL)
    //const api = new Api('http://localhost:3001')
  
    yield all([
       takeLatest(Types.SIGNIN_REQUEST, login({ api })),
       takeLatest(Types.AUTH_REQUEST, auth({ api })),
       takeLatest(Types.GET_CATEGORIES_REQUEST, getCategories({ api })),
       takeLatest(Types.GET_RUNS_REQUEST, getRuns({ api })),
       takeLatest(Types.GET_USERS_REQUEST, getUsers({ api })),
       takeLatest(Types.DESTROY_AUTH_REQUEST, destroyAuth),
       takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile({ api })),
       takeLatest(Types.CREATE_PROFILE_REQUEST, createProfile({ api })),
       
       takeLatest(Types.CREATE_RUN_REQUEST, createRun({ api })),
       takeLatest(Types.REMOVE_RUN_REQUEST, removeRun({ api })),
      
       takeLatest(Types.GET_CATEGORY_REQUEST, getCategory({ api })),
       takeLatest(Types.CREATE_CATEGORY_REQUEST, createCategory({ api })),
       takeLatest(Types.REMOVE_CATEGORY_REQUEST, removeCategory({ api })),
       takeLatest(Types.UPDATE_CATEGORY_REQUEST, updateCategory({ api })),

       takeLatest(Types.GET_USER_REQUEST, getUser({ api })),
       takeLatest(Types.UPDATE_USER_REQUEST, updateUser({ api })),
       takeLatest(Types.REMOVE_USER_REQUEST, removeUser({ api })),

       
       put(ActionCreators.authRequest())  
   ])
}