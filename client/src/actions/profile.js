import axios from 'axios';
import {setAlert} from './alert';
import{
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    CLEAR_PROFILE
} from './types';
//get curr profile
export const getCurrentProfile=()=>async dispatch=>{
    try{
const res=await axios.get('/api/profile/me');
dispatch({
    type:GET_PROFILE,
    payload:res.data
})
    }
    catch(error){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,
                status:error.response.status}
        })

    }
}
//get all profiles
export const getProfiles=()=>async dispatch=>{
    dispatch({type:CLEAR_PROFILE});
    try{
const res=await axios.get('/api/profile');
//console.log(res.data);
dispatch({
    type:GET_PROFILES,
    payload:res.data
})
    }
    catch(error){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,
                status:error.response.status}
        })

    }
}
export const getProfileById=userId=>async dispatch=>{
    
    try{
const res=await axios.get(`/api/profile/user/${userId}`);
 console.log("found you");
 console.log(res.data);
dispatch({
    type:GET_PROFILE,
    payload:res.data
})
    }
    catch(error){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,
                status:error.response.status}
        })

    }
}

//create and update the profile
export const createProfile=(formData,history,edit=false)=>async dispatch=>{
   try{
 const config={
     headers:{
         'Content-Type':'application/json'

     }
 }
 const res=await axios.post('/api/profile',formData,config)
 dispatch({
    type:GET_PROFILE,
    payload:res.data
});
dispatch(setAlert(edit?'Profile Updated':'Profile Created'))
if(!edit){
    history.push('/dashboard')
}
} 
   catch(error)
   {
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText,
            status:error.response.status}
    })

}
}