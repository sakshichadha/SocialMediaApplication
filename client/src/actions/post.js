import axios from 'axios';
import {setAlert} from './alert'
import{
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,DELETE_POST,ADD_POST,ADD_COMMENT,GET_POST
} from './types';
export const getPosts=()=>async dispatch=>{
   try {
    console.log("HEYY2");
       const res=await axios.get('/api/posts');
       console.log("HEYY");
       console.log(res.data)
       dispatch({
           type:GET_POSTS,
           payload:res.data
        });

   }
   catch(err){
       dispatch({
           type:POST_ERROR,
           payload:{msg:err.response.statusText,status:err.response.status}
       });

   }
} 
//udd likes
export const addLike=postId=>async dispatch=>{
    try {
     console.log("HEYY2");
        const res=await axios.put(`/api/posts/like/${postId}`);
        console.log("HEYYLOOOOOOO");
        console.log(res.data);
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId,likes:res.data}
         });
 
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
 
    }
 }
 //DELETE POST
 export const deletePost=postId=>async dispatch=>{
    try {
     console.log("HEYY2");
        await axios.delete(`/api/posts/${postId}`);
        console.log("HEYY");
   
        dispatch({
            type:DELETE_POST,
            payload:{postId}
         });
 dispatch(setAlert('Post removed','success'))
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
 
    }
 }
  //add POST
  export const addPost=formData=>async dispatch=>{
    //   const config={
    //       headers:{'Content-Type':'appplication/json'}
    //   }
    try {
     console.log("HEYY2");
        const res=await axios.post('/api/posts',formData);
        console.log("HEYY in add post");
        console.log(res.data)
        dispatch({
            type:ADD_POST,
            payload:res.data
         });
 dispatch(setAlert('Post Created','success'))
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
 
    }
 }
  //add comment
  export const addComment = (postId, formData) => async dispatch => {
    try {
      const res = await axios.post(`/api/posts/comment/${postId}`, formData);
  
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
  
      dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  ///get POST
  export const getPost=id=>async dispatch=>{
    try {
     console.log("HEYY2");
        const res=await axios.get(`/api/posts/${id}`);
        console.log("HEYY");
        console.log(res.data)
        dispatch({
            type:GET_POST,
            payload:res.data
         });
 
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
 
    }
 } 