const { body } = require('express-validator');

const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title is required'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required'),
];

const validateComment = [
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Comment content is required'),
];

module.exports = {
  validateRegister,
  validateLogin,
  validatePost,
  validateComment,
};