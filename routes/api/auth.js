const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/',auth,async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);

  } catch (err) {
    console.log("YES123456");
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("YES!");
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        console.log("YES2");
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
// const express=require('express');
// const router=express.Router();
// const User=require('../../models/User');
// const auth=require('../../middleware/auth');
// const {check, validationResult }=require('express-validator/check');
// const jwt=require('jsonwebtoken');
// const config=require('config');
// const bcrypt=require('bcryptjs');

// router.get('/',auth,async(req,res)=>
// {
// try{
// const user=await User.findById(req.user.id).select('-password');
// res.json(user);
// }
// catch(err)
// {
//     console.error(err.message);
//     res.status(500).send('Server eror');

// }

// });
// router.post('/',[
// check('email','Please include a valid email').isEmail(),
// check('password','Password is required').exists()],async(req,res)=>
// { console.log("HELLOQWERTY1");
//     const errors=validationResult(req);
//     if(!errors.isEmpty())
//     {
//         return res.status(400).json({errors:errors.array()});
//     }
// const {email,password }=req.body;
// console.log("HELLOQWERTY2");
// try{
//     let user=await User.findOne({email});
//     if(!user)
//     { console.log("HELLOQWERTY3");
//         return res.status(400).json({errors:[{msg:'Invalid credentials'}]});
//     }
   
//     console.log("HELLOQWERTY4");
//    //match password matches
//    const isMatch=await bcrypt.compare(password,user.password);
//    if(!isMatch)
//    {
//     return res.status(400).json({errors:[{msg:'Invalid credentials'}]}); 
//    }
//    console.log("HELLOQWERTY5");
// const payload={
//     user:{
//         id:user.id
//     }
// };

//     jwt.sign(payload,
//         config.get('jwtSecret'),
//         { expiresIn:'5 days'},
//     (err, token)=>{
//         if(err) throw err;
//         res.json({token});
//     });
    
// }
// catch(err)
// {
//     //console.log("HERESAKSHI");
// console.log(err.message);
// res.status(500).send('Server erroor');
// }
// });

// module.exports=router;