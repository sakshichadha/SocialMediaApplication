const mongoose=require('mongoose');
const RequestSchema=new mongoose.Schema({
    sender_id:
    {
       type:mongoose.Schema.Types.ObjectId,
       ref:'user' 
    },
    receiver_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user' 
    }
    
}
    
   
);
module.exports=request=mongoose.model('request',RequestSchema);