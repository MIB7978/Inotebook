const express  = require('express')
const Notes = require('../model/Notes')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const { body, validationResult } = require("express-validator");

//Route-1 to get all the notes login required
router.get('/fetchnotes', fetchuser,async (req,res)=>{
    
    try{
    const fetchnote = await Notes.find({user:req.user.id})
    res.json(fetchnote)
    }
    catch(err)
    {
        res.status(404).json({ error: "internal server error" });
    }
})


// Route-2 to create Notes login required
router.post('/createNotes',[
    body("title", "enter a valid title ").isLength({ min: 3 }),
    body("description", "enter valid mail").isLength({ min: 5 }),
    body("tag").isLength({ min: 3 }),
],fetchuser,async (req,res)=>{
   
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title,description,tag} = req.body
    try{
        const notes = new Notes({
            title,description,tag,user:req.user.id
        })
           
       const savenotes = await notes.save()
       res.json(savenotes)
    }
    catch(err)
    {
        res.status(404).json({ error: "internal server error" });
    }

})


// Route-3 to update Notes login required
module.exports = router