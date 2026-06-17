const { body, param } = require('express-validator');

// declare rules as an array before the handler
const createNoteRules = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 120 })
    .withMessage('Title must be 120 characters or less'),

  body('course')
    .trim()
    .notEmpty()
    .withMessage('Course is required'),
];

const noteIdRules = [
    param('id').isInt({ min : 1}).withMessage('Note ID must be a positive integer'),
];

module.exports = {
    createNoteRules,
    noteIdRules,
}