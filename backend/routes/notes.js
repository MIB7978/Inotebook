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
   ;
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    const {title,description,tag} = req.body
   
    try{
      
        const notes = await new Notes({
            title,description,tag,user:req.user.id
        })
       
    
       const savenotes = await notes.save()
      
      res.json(savenotes)
    }
    catch(err)
    {
        res.status(404).json({ error: "internally server error" });
    }

})


// Route-3 to update Notes login required

router.put('/updateNotes/:id',fetchuser,async (req,res)=>{
    
    try{
        const {title,description,tag} = req.body
        let notes ={}
        if(title) notes.title = title
        if(description) notes.description = description
        if(tag) notes.tag = tag 
        
        let note = await Notes.findById(req.params.id)
        if(!note) return res.status(404).send("nt found page")
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("acess denied")
        }
        
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:notes},{new:true})
        console.log(note.user.toString(),req.user.id);
        res.json(note)

       
    }
    catch(err)
    {
        res.status(404).json({ error: "internal server error" });
    }


})

// Route-4 to delete Notes login required
router.delete('/deleteNotes/:id',fetchuser,async (req,res)=>{
    
    try{
        
        
        let note = await Notes.findById(req.params.id)
        if(!note) return res.status(404).send("not found note")
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("acesss denied")
        }
        
        note = await Notes.findByIdAndDelete(req.params.id)
        res.send("your note deleted ")

       
    }
    catch(err)
    {
        res.status(404).json({ error: "internal server error" });
    }


})

module.exports = router