import auth from './auth';
import { combineReducers } from 'redux';
import alert from './alert';
import profile from './profile';
import post from './post';

export default combineReducers({alert,auth,profile,post});