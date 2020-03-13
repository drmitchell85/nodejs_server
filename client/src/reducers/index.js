// responsible for data / redux setup

import { combineReducers } from 'redux';
import authReducer from './authReducer';

// the keys in our state object
export default combineReducers({
    // auth state is being produced bu the authReducer
    auth: authReducer
});