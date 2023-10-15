const express = require("express");
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require("../controllers/notesController");


router.get("/", getNotes).post("/", createNote);
router.put("/:id", updateNote).delete("/:id", deleteNote);


module.exports = router; 