const { body, param } = require('express-validator');

// declare rules as an array before the handler
const createNoteRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 120 })
    .withMessage("Title cannot exceed 120 characters"),

  body("course")
    .trim()
    .notEmpty()
    .withMessage("Course is required")
    .isLength({ max: 120 })
    .withMessage("Course cannot exceed 120 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ max: 5000 })
    .withMessage("Content cannot exceed 5000 characters"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Each tag must be a non-empty string"),
];

const noteIdRules = [
    param('id').isMongoId().withMessage("Invalid note ID"),
];


const updateNoteRules = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 120 })
    .withMessage("Title cannot exceed 120 characters"),

  body("course")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course cannot be empty")
    .isLength({ max: 120 })
    .withMessage("Course cannot exceed 120 characters"),

  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isLength({ max: 5000 })
    .withMessage("Content cannot exceed 5000 characters"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Each tag must be a non-empty string"),

  body("likes")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Likes must be a non-negative number"),
];


module.exports = {
    createNoteRules,
    noteIdRules,
    updateNoteRules,
}