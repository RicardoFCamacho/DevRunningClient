import ActionCreators from '../actionCreators'
import { put, call } from 'redux-saga/effects'

//action = false ou true
export  const getCategories = ({ api }) => function* (action){
      
   const categories = yield call(api.getCategories)
   yield put(ActionCreators.getCategoriesSuccess(categories.data.data))
}

export const getCategory = ({ api }) => function* (action){
    const category = yield call(api.getCategory ,action.id)
    console.log('PASSEI')
    yield put(ActionCreators.getCategorySuccess(category.data))
}

export  const createCategory = ({ api }) => function* (action){
    
    const category = yield call(api.createCategory, action.category)    
    yield put(ActionCreators.createCategorySuccess(category.data))
   
}

export const removeCategory = ({ api }) => function* (action){
   yield call(api.removeCategory, action.id)
   yield put(ActionCreators.removeCategorySuccess(action.id))
    
}

export const updateCategory = ({ api }) => function* updateCategory(action){
    yield call(api.updateCategory, action.category)
    yield put(ActionCreators.updateCategorySuccess(action.category))
  }