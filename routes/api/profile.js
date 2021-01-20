const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Profile=require('../../models/Profile');
const User=require('../../models/User');
const {check, validationResult }=require('express-validator/check');
 //@ Get api/profile/me
router.get('/me',auth,async (req,res)=>
{
try{
const profile=await Profile.findOne({user:req.user.id,}).populate(
    'user',['name','avatar']);
if(!profile)
{
return res.status(400).json({msg:'There is no profile for this user'});
}
res.json(profile);
}
catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}

});
//pos api/profile,private
router.post('/',auth,async(req,res)=>{
    console.log("INSIDEOUT")
const {location,bio,status}=req.body;
const profileFields={
    user:req.user.id,
    location:location,
    bio:bio,
    status:status
};

console.log(profileFields);
//insert the data
try{
let profile=await Profile.findOne({user:req.user.id});
if(profile){
    //update
    profile=await Profile.findOneAndUpdate({user:req.user.id},
        {$set:profileFields},
        {new :true})
        return res.json(profile);
        
}//create
profile=new Profile(profileFields);
console.log("DONE profile");
await profile.save();
res.json(profile);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
}
}
);
//get all profile private api/profile
router.get('/',async(req,res)=>{
try{
const profiles=await Profile.find().populate('user',['name']);
res.json(profiles);
}
catch(err){
   console.error(err.message);
   res.sendStatus(500).send('Server error');
}
    
});
router.get('/user/:user_id',async(req,res)=>{
    try{
    const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name']);
    if(!profile)
    return res.status(400).json({msg:'there is no profile for this user'});

    return res.json(profile);
    }
    catch(err){
       console.error(err.message);
    //    if(err.kind=='ObjectId')
    //    return res.status(400).json({msg:'there is no profile for this user'});
       res.sendStatus(500).send('Server error');
    }
        
    });
    //delete user
    router.delete('/',auth,async(req,res)=>{
        try{
            //remove profile
       await Profile.findOneAndRemove({user:req.user.id});
       //remove user
       await User.findOneAndRemove({_id:req.user.id});
        res.json(profiles);
        res.json({msg:'user deleted'});
        }
        catch(err){
           console.error(err.message);
           res.sendStatus(500).send('Server error');
        }
            
        });
        //get all profiles route public
        // router.get('/',async(req,res)=>{

        // })
      

module.exports=router;