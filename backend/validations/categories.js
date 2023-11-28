const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateCategoryInput = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required'),

    handleValidationErrors
];

module.exports = validateCategoryInput;