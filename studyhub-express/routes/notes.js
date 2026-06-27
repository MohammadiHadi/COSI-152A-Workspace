const express = require('express');
const router = express.Router();
const {
getNotes,
createNote,
updateNote,
deleteNote,
getOneNote,
likeNote,
} = require('../controllers/notesController');

const {createNoteRules, noteIdRules, updateNoteRules} = require("../validators/notesValidators")
const {validate} = require("../middleware/validate")
const {protect, optionalAuth} = require("../middleware/auth")

router.get('/', optionalAuth,  getNotes);
router.get('/:id', optionalAuth, noteIdRules, validate,  getOneNote);
router.post('/', protect, createNoteRules, validate, createNote);
router.patch("/:id/like", protect, noteIdRules, validate, likeNote);
router.patch('/:id', protect, noteIdRules, updateNoteRules, validate, updateNote)
router.delete('/:id', protect, noteIdRules, validate, deleteNote)

module.exports = router;
