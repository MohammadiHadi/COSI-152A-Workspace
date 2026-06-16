const express = require('express');
const router = express.Router();
const {
getNotes,
createNote
} = require('../controllers/notesController');

function logger(req,res, next){
    console.log(req.method + ' ' + req.url);  // logger
    next()
}

router.get('/',logger,  getNotes);

router.post('/', createNote);
module.exports = router;
