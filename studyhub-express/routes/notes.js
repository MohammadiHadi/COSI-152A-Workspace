const express = require('express');
const router = express.Router();
const {
getNotes,
createNote,
} = require('../controllers/notesController');
const {createNoteRules, noteIdRules} = require("../validators/notesValidtors")
const {validate} = require("../middleware/validate")

function logger(req,res, next){
    console.log(req.method + ' ' + req.url);  // logger
    next()
}

router.get('/',logger,  getNotes);

router.post('/', createNoteRules, validate, createNote);
module.exports = router;
