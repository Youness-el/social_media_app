import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    message: messageReducer,
});

export default rootReducer;
