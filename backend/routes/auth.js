const express = require("express");

const User = require("../model/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//create a user for sign up
router.post(
  "/",
  [
    body("name", "enter a valid name ").isLength({ min: 3 }),
    body("email", "enter valid mail").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // checking user exist or not
      let user = await User.findOne({ email: req.body.email });
      if (user) 
      {
        return res.status(400).json({ error: "sorry email already exists" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } 
    catch (error) 
    {
      res.status(404).json({ error: "page not found" });
    }
  }
);

module.exports = router;
