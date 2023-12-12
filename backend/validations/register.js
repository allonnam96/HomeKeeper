const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateRegisterInput = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Email is invalid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Name must be at least 1 character'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be between 6 and 30 characters'),
  check('birthday')
    .exists({ checkFalsy: true })
    .withMessage('Enter birthday'),
  handleValidationErrors
];

module.exports = validateRegisterInput;