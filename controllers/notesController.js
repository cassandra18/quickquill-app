const asyncHandler = require("express-async-handler");
const Note = require("../models/notesModel");
//get notes
//GET method

const getNotes = asyncHandler( async (req, res) => {

    const notes = await Note.find();

    res.json(notes);

});


//create notes
//POST method

const createNote = asyncHandler( async (req, res) => {
    const { title, content } = req.body;

    const newNote = await Note.create( {title, content });

    res.status(201).json(newNote);

});

//update notes
//PUT method

const updateNote = asyncHandler( async (req, res) => {
    const { title, content } = req.body;
    const noteId = req.params.id;

    const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });

   
    res.json(updatedNote)
});

//delete notes
//DELETE method

const deleteNote = asyncHandler( async (req, res) => {
    const noteId = req.params.id;

    const deletedNote = await Note.findByIdAndDelete(noteId);

   
    if (deletedNote) {
        res.json({ message: 'Note deleted successfully' });
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
});


module.exports = { getNotes, createNote, updateNote, deleteNote };
