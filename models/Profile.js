const mongoose=require('mongoose');
const ProfileSchema=new mongoose.Schema({
    user:
    {
       type:mongoose.Schema.Types.ObjectId,
       ref:'user' 
    },
    location : {
        type:String,
        required: true
    },
    bio:{
        type:String
    },
    status:{
        type:String
    }
   

}
    
   
);
module.exports=profile=mongoose.model('profile',ProfileSchema);