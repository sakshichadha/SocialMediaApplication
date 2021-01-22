import axios from 'axios';
import {setAlert} from './alert';
import{
   SEND_REQUEST,
   ACCEPT_REQUEST,
   REJECT_REQUEST,
   ERROR_REQUEST,GET_REQUESTS
} from './types';
//get curr profile
export const sendRequest=receiver_id=>async dispatch=>{
    try{
const res=await axios.post('/api/users/sendRequest',receiver_id);
dispatch({
    type:SEND_REQUEST,
    payload:{receiver_id}
  
})
dispatch(setAlert('Request sent','Sucess'))
    }
    catch(error){
        dispatch({
            type:ERROR_REQUEST,
            payload:{msg:error.response}
           
        })

    }
}
//accept request
export const acceptRequest=(id)=>async dispatch=>{
    try{
        console.log("BOLO1");
const res=await axios.get(`/api/users/acceptRequest/${id}`);
console.log("BOLO");
dispatch({
    type:ACCEPT_REQUEST,
    payload:res.data
  
})
    
dispatch(setAlert('Request Accepted','Sucess'));
    }

    catch(error){
        dispatch({
            type:ERROR_REQUEST,
            payload:{msg:error.response}
           
        })

    }
};
///reject
export const rejectRequest=(id)=>async dispatch=>{
    try{
const res=await axios.get(`/api/users/rejectRequest/${id}`);
dispatch({
    type:REJECT_REQUEST,
    payload:res.data
  
})
    
dispatch(setAlert('Request Rejected','Sucess'));
    }

    catch(error){
        dispatch({
            type:ERROR_REQUEST,
            payload:{msg:error.response}
           
        })

    }
};
export const get_requests = () => async dispatch => {
    try {
     
      const res = await axios.get('/api/users/getRequests/');
      console.log(res.body);
      console.log("IN ACTION")
      dispatch({
        type: GET_REQUESTS,
        payload: res.data,
      });
      dispatch(setAlert('Request Sent', 'success'));
    } catch (error) {
      console.log('error')
      dispatch({
        type: ERROR_REQUEST,
        payload: { msg: error.response },
      });
    }
  };
