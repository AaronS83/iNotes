const express = require("express")
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchUser")

//ROUTE 1:
// fetches all notes of the user from the db of the logged in user
// uses GET "/api/notes/fetchallnotes"
//login required
router.get('/fetchallnotes',fetchuser, async (req, res)=>{
    try {
        // we are fetching all the notes of the user from the db with the id similar to user.id
        // It is an array
        const notes = await Note.find({user:req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

//ROUTE 2:
// add new note
// uses POST "/api/notes/addnote"
//loging required
router.post('/addnote',fetchuser,[
    body('title',"Please enter a valid title").isLength({min:3}),
    body('description',"Please enter a valid desscription").isLength({min:10}),
], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        // de-structure the i/p sent to us that has the below entities
        const {title, description, tag} = req.body;
        // If there is an error/s return the error
        const note = await new Note({
        title, description, tag, user: req.user.id
     })

     // save the new note created into the db and send it as a response
    const saveNote = await note.save();
    res.json(saveNote)

    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server error' });
    }
})

//ROUTE 3:
// update note
// uses PUT "/api/notes/updatenote"
//logging required

router.put('/updatenote/:id',fetchuser, async (req, res)=>{
    try {
    const {title, description, tag} = req.body;
    
    // Create a new note object
    const newNote = {};
    // if the title is a part of the req
    if(title) {newNote.title = title};
    
    // if the description is a part of the req
    if(description) {newNote.description = description}

    // if the tag is a part of the req
    if(tag) {newNote.tag = tag}

    //find the note to be updated
    let note =await Note.findById(req.params.id);

    // If the note does not exist
    if(!note){
        return res.status(404).send({error: "Not found"});
    }

    // if the user id stored in the note is not the same as the user id of the person trying to edit the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send({error: "Invalid User"});
    }

    // Find the id, set the note to newNote, and new:true means if the note is new it will create a new note
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})   
    res.json(note);

    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server error' });
    }
})

//ROUTE 4:
// delete note
// uses delete "/api/notes/deletenote"
//logging required
//similar to the previous api endpoint

router.delete('/deletenote/:id',fetchuser, async (req, res)=>{
    try {

    //find the note to be deleted
    let note =await Note.findById(req.params.id);

    // If the note does not exist
    if(!note){
        return res.status(404).send({error: "Not found"});
    }

    // if the user id stored in the note is not the same as the user id of the person trying to delete the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send({error: "Invalid User"});
    }

    // Find the id, set the note to newNote, and new:true means if the note is new it will create a new note
    note = await Note.findByIdAndDelete(req.params.id)   
    res.json({success: "Note has been deleted", note: note});

    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server error' });
    }
})
module.exports = router