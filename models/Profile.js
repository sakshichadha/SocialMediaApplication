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
    social:{
    youtube:{
    type:String
    },
    instagram:{
    type:String
    }

}
    
   
});
module.exports=profile=mongoose.model('profile',ProfileSchema);