//gerenciador de reducers
import { combineReducers } from 'redux'

import auth from './auth'
import runs from './runs'
import categories from './categories'
import users from './users'

const rootReducer = combineReducers({
    auth,
    runs,
    users,
    categories
})
export default rootReducer