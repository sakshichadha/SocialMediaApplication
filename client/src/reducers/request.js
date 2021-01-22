import {
    SEND_REQUEST,ERROR_REQUEST,ACCEPT_REQUEST,REJECT_REQUEST,GET_REQUESTS
} from '../actions/types';
const initialState={
    requests:[],
    loading:true
}
export default function(state=initialState,action)
{ 
    const {type,payload}=action;
    switch(type)
    {
        case ACCEPT_REQUEST:
        case REJECT_REQUEST:
        case GET_REQUESTS:
            return {
                ...state,
                requests:payload,
                loading:false
            }
        // case SEND_REQUEST:
        //     return {
        //         ...state,
        //         loading:false
        //     }
        // case ERROR_REQUEST:
        //     return {
        //         ...state,
        //         loading:false
        //         // profile:null sakshi logic
        //     };
        default:
                return state
    }
    }
