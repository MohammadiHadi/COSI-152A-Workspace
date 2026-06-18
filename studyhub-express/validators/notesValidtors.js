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


const updateNoteRules = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 120 })
   .withMessage('Title must be 120 characters or less'),

  body('content').optional().trim(),

  body('course').optional().trim().notEmpty().withMessage('Course cannot be empty'),

  body('tags').optional().isArray().withMessage('Tags must be an array'),

  body('tags.*').optional().trim().notEmpty().withMessage('Each tag must be a non-empty string'),
];


module.exports = {
    createNoteRules,
    noteIdRules,
    updateNoteRules,
}