const express  = require('express')

const User = require('../model/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');


//create a user bit not authentication 
router.post('/',[
    body('name','enter a valid name ').isLength({ min: 3 }),
    body('email','enter valid mail').isEmail(),
    body('password').isLength({ min: 5 })
],(req,res)=>{

    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email:req.body.email,
      password: req.body.password,
    }).then(user => res.json(user)).catch(err=> {console.log(err)
    res.json({error:"enter  a unique email",message:err.message})});
    
})

module.exports = router