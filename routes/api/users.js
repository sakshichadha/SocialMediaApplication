
const express=require('express');
const router=express.Router();
const {check, validationResult }=require('express-validator/check');
const User=require('../../models/User');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const normalize = require('normalize-url');


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