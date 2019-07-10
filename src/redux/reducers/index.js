import { combineReducers } from 'redux'
import UserReducer from './user'
import StatusReducer from './status'

export default combineReducers({
    user : UserReducer,
    status : StatusReducer
})