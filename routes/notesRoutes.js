const express = require("express");
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require("../controllers/notesController");
const verifyToken = require("../middleware/authMiddleware");


router.route("/").get(verifyToken, getNotes).post(verifyToken, createNote);

router.route("/:id").put(verifyToken, updateNote).delete(verifyToken, deleteNote);


module.exports = router; 