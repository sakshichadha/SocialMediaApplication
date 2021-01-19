import axios from 'axios';
import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,
  AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from './types';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if(localStorage.token)
    {setAuthToken(localStorage.token);}
    try {
      const res = await axios.get('api/auth');
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
  
  // Register User
  export const register = ({name,email,password}) => async dispatch => {
  
      const config={
        headers:{
          'Content-Type':'application/json'
        }
      }
        const body=JSON.stringify({name,email,password});
try{
const res=await axios.post('/api/users',body,config);
localStorage.setItem('token',res.data.token);
dispatch({
  type:REGISTER_SUCCESS,
  payload:res.data
});
dispatch(loadUser());
}
catch(err){
  const errors=err.response.data.errors;
  if(errors)
  {
    errors.forEach(errpr=>dispatch(setAlert(errors.msg,'danger')));
  }

  dispatch(
    {
    type:REGISTER_FAIL
    }
      
    );
  }
}
export const login = ({email,password}) => async dispatch => {
  console.log(email);
  
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
    const body=JSON.stringify({email,password});
    console.log(email);
try{
  console.log("FISH")
const res=await axios.post('/api/auth',body,config);
console.log("HIII");console.log(res);
localStorage.setItem('token',res.data.token);
dispatch({
type:LOGIN_SUCCESS,
payload:res.data
});
dispatch(loadUser());
}
catch(err){
const errors=err.response.data.errors;
if(errors)
{
errors.forEach(errpr=>dispatch(setAlert(errors.msg,'danger')));
}
localStorage.removeItem('token');

dispatch(
{
type:LOGIN_FAIL
}
  
);
}
}
//logout
export const logout=()=>dispatch=>{

}
