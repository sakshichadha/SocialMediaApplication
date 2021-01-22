
const express=require('express');
const router=express.Router();
const {check, validationResult }=require('express-validator/check');
const User=require('../../models/User');
const Request=require('../../models/Request');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const normalize = require('normalize-url');
const auth=require('../../middleware/auth');

router.post('/sendRequest',auth,async(req,res)=>{
    const {receiver_id}=req.body;
    console.log("INSIDE SEND REQUEST ROUTE")
    try{
        request=new Request({
            sender_id:req.user.id,
            receiver_id:receiver_id,
        
        });
        await request.save();
        //res.send("sent and save");
    }
    catch(error)
    {
        res.status(500).send('server error');
    }
})
router.get('/getRequests', auth, async (req, res) => {
  console.log("WELCOME");
    try {
      console.log('sakshi before');
    const requests=await Request.find({ "receiver_id": req.user.id });
    console.log('sakshi');
    console.log(requests);
      res.send(requests);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  router.get('/acceptRequest/:id', auth, async (req, res) => {
    
    try {
      console.log("entry");
      const request = await Request.findById(req.params.id)
      if(!request){
          return res.status(404).json({msg:"No such request found"})
      }
      console.log("yes1");
      const selfUser= await User.findById(req.user.id)
       console.log("yes2");
      const sender= await User.findById(request.sender_id)
      selfUser.friends.push(sender.id)
      sender.friends.push(selfUser.id)
      console.log("yes");
      await selfUser.save()
      await sender.save()
      await Request.deleteOne({"_id":request.id})
      
      const remaining_requests = await Request.find({receiver_id:req.user.id})
      return res.send(remaining_requests)
      } catch (error) {
          console.error(error.message)
      }
  });
  router.get('/rejectRequest/:id', auth, async (req, res) => {
    
    try {
      
      const request = await Request.findById(req.params.id)
      if(!request){
          return res.status(404).json({msg:"No such request found"})
      }
     
      await Request.deleteOne({"_id":request.id})
      
      const remaining_requests = await Request.find({receiver_id:req.user.id})
      return res.send(remaining_requests)
      } catch (error) {
          console.error(error.message)
      }
  });
router.post(
    '/',
    [check('name','Name is required').notEmpty(),
check('email','Please include a valid email').isEmail(),
check('password','Please enter a password with 6 or more characters').isLength({min:6})],async(req,res)=>
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    { 
        return res.status(400).json({errors:errors.array()});
    }

const { name,email,password }=req.body;
try{
    console.log('HERE2');
    let user=await User.findOne({email});
    console.log('HERE3');
    if(user)
    { console.log('HERE4');
        return res.status(400).json({errors:[{msg:'User already exists'}]});
    }
    const avatar=gravatar.url(email,{
      s:'200',
      r:'pg',
      d:'mm'  
    });
    console.log('HERE5');
    user=new User({
        name,email,avatar,password
    });
   
    //encrypt password
    const salt=await bcrypt.genSalt(10);
    console.log('HERE7');
user.password=await bcrypt.hash(password,salt);
console.log('HERE8');
await user.save();

//return jsonwebtoken
const payload={
    user:{
        id:user.id
    }
};
console.log('HERE8');
    jwt.sign(payload,config.get('jwtSecret'),{ expiresIn:'5 days'},
    (err, token)=>{
        if(err) throw err;
       
        res.json({token});
    });
}
catch(err)
{ 
console.log('Error in users.js');
res.status(500).send('Server Error');
}
});
module.exports=router;