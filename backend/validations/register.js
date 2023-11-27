const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const isValidDate = (value) => {

  const dateFormat = /^\d{2}-\d{2}-\d{4}$/;
  
  if (!dateFormat.test(value)) {
    throw new Error('Birthday must be in a valid date format');
  }

  return true;
};

const validateRegisterInput = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Email is invalid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Name must be at least 1 character'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be between 6 and 30 characters'),
  check('birthday')
    .exists({ checkFalsy: true })
    .custom(isValidDate)
    .withMessage('Birthday must be in a valid date format'),

  handleValidationErrors
];

module.exports = validateRegisterInput;