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
const profile=await Profile.findOne({user:req.user.id}).populate('user',['name']);
if(!profile)
return res.status(400).json({msg:'There is no profile for this user'});
return json(profile)
}
catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}

});
//pos api/profile,private
router.post('/',[auth,[check('status','Status is req').not().isEmpty()]],async(req,res)=>{
const errors=validationResult(req);
if(!error.isEmpty())
return res.status(400).json({errors:errors.array()});
const {location,bio,status,youtube,instagram}=req.body;
const profileFields={};
profileFields.user=req.user;
if(location)
profileFields.location=location;
if(bio)
profileFields.bio=bio;
if(status)
profileFields.status=status;
profileFields.social={}
if(youtube) profileFields.social.youtube=youtube;
if(instgram) profileFields.social.instagram=instagram;
res.send("hello");
//insert the data
try{
let profile=await Profile.findOne({user:req.user.id});
if(profile){
    //update
    profile=await Profile.findOneAndUpdate({user:req.user.id},
        {$set:profileFields},
        {new :true});
}//create
profile=new Profile(profileFields);
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
router.get('/user:user_id',async(req,res)=>{
    try{
    const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name']);
    if(!profile)
    return res.status(400).json({msg:'there is no profile for this user'});

    res.json(profiles);
    }
    catch(err){
       console.error(err.message);
       if(err.kind=='ObjectId')
       return res.status(400).json({msg:'there is no profile for this user'});
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
      

module.exports=router;