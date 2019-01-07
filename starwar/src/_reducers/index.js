import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import planetReducer from './planetReducer';
const rootReducer = combineReducers({
    loginusers : loginReducer,
    userReducer : userReducer,
    planetReducer : planetReducer
    
  });
  
  export default rootReducer;