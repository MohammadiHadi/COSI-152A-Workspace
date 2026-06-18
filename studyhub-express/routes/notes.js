const express = require('express');
const router = express.Router();
const {
getNotes,
createNote,
updateNote,
deleteNote,
} = require('../controllers/notesController');

const {createNoteRules, noteIdRules, updateNoteRules} = require("../validators/notesValidtors")
const {validate} = require("../middleware/validate")

router.get('/',  getNotes);

router.post('/', createNoteRules, validate, createNote);
router.patch('/:id', noteIdRules, updateNoteRules, validate, updateNote)
router.delete('/:id', noteIdRules, validate, deleteNote)

module.exports = router;
