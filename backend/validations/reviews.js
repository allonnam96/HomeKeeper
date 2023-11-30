const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateReviewInput = [
    check('reviewStar')
        .isFloat({ min: 1, max: 5 })
        .withMessage('Review star must be between 1 and 5'),
    check('reviewSummary')
        .exists({ checkFalsy: true })
        .withMessage('Category is required'),
    check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required'),
    handleValidationErrors
];

module.exports = validateReviewInput; 