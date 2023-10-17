const asyncHandler = require("express-async-handler");
const Note = require("../models/notesModel");
//get notes
//GET method

const getNotes = asyncHandler( async (req, res) => {

    const notes = await Note.find();

    res.status(200).json(notes);

});


//create notes
//POST method

const createNote = asyncHandler( async (req, res) => {
    const { title, content } = req.body;

    if(!title || !content) {
        res.status(400);
        throw new Error('please add add text fields');
    }
    const newNote = await Note.create( {title, content });

    res.status(201).json(newNote);

});

//update notes
//PUT method

const updateNote = asyncHandler( async (req, res) => {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);

    if(!note) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedNote = await Note.findByIdAndUpdate(note, { title, content }, { new: true });

   
    res.status(200).json(updatedNote)
});

//delete notes
//DELETE method

const deleteNote = asyncHandler( async (req, res) => {
    const note = await Note.findById(req.params.id);


    if(!note) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const deletedNote = await Note.findByIdAndDelete(note);

   
    if (deletedNote) {
        res.json({ message: 'Note deleted successfully' });
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
});


module.exports = { getNotes, createNote, updateNote, deleteNote };
