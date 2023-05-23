import { combineReducers } from 'redux'
import authReducer from './authReducer'
import postReducer from './postReducer'
import userReducer from './userReducer'
import allUsersReducer from './allUsersReducer'
import messageReducer from './messageReducer'
export const reducers = combineReducers({
    authReducer, postReducer, userReducer, allUsersReducer, messageReducer
})