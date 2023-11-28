const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');


const validateContractorInput = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required'),
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Title is required'),
    check('reviewStar')
        .isFloat({ min: 1, max: 5 })
        .withMessage('Review star must be between 1 and 5'),
    check('bio')
        .exists({ checkFalsy: true })
        .withMessage('Bio is required'),
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Address is required'),
    check('photoUrl')
        .exists({ checkFalsy: true })
        .withMessage('Photo URL is required'),
    check('category')
        .exists({ checkFalsy: true })
        .withMessage('Category is required'),
    handleValidationErrors
];

module.exports = validateContractorInput;
