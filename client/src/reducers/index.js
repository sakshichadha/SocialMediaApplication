import auth from './auth';
import { combineReducers } from 'redux';
import alert from './alert';
import profile from './profile';
import post from './post';
import request from './request'

export default combineReducers({alert,auth,profile,post,request });