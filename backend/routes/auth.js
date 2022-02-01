const express = require("express");
const fetchuser = require("../middleware/fetchuser")
const User = require("../model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require("express-validator");


const JWT_SECRET = "youcannothack";
//Route-1 creating user endpoint /api/auth
router.post(
  "/",
  [
    body("name", "enter a valid name ").isLength({ min: 3 }),
    body("email", "enter valid mail").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      // checking user exist or not
      let user = await User.findOne({ email: req.body.email });
      if (user) 
      {
        return res.status(400).json({success, error: "sorry email already exists" });
      }
      let salt = await bcrypt.genSalt(10);
      let secPass  = await bcrypt.hash(req.body.password,salt)
     
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data  = {
        user:{
          id:user.id
        }
      }
      success=true
      const authtoken   = jwt.sign(data,JWT_SECRET)
      res.json({success,authtoken});
    } 
    catch (error) 
    {
      res.status(404).json({ error: "page not found" });
    }
  }
);

// Route-2 login with password /api/auth/login
router.post(
  "/login",
  [
    
    body("email", "enter valid mail").isEmail(),
    body("password").exists(),
  ],
  async (req, res) => {
    
   
    let success = false;
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body
    try{
    
      let user = await User.findOne({email})
     
      if(!user)
      return res.status(400).json({success,msg:"enter correct credentials"})
    
      let comparePass = await bcrypt.compare(password,user.password)
      if(!comparePass)
      return res.status(400).json({success,msg:"enter correct credentials"})
   
      const data  = {
        user:{
          id:user.id
        }
      }
      success = true;
      const authtoken   = jwt.sign(data,JWT_SECRET)
      res.json({success, authtoken});

    }
    catch (error) 
    {
      res.status(404).json({ error: "page not found" });
    }
 })

// Route-3 getting user details by auth-token  /api/auth/getuser
router.post('/getuser',fetchuser, async (req,res)=>{

  try{
    userid = req.user.id
    const user = await User.findById(userid).select("-password")
    res.send(user)

  }
  catch(err)
  {
    
    return res.status(500).send("Internal server error")
  }


})

module.exports = router;
