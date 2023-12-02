const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');


const validateContractorInput = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required'),
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Title is required'),
    check('bio')
        .exists({ checkFalsy: true })
        .withMessage('Bio is required'),
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Address is required'),
    check('longitude')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is required'),
    check('latitude')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is required'),
    check('photoUrl')
        .exists({ checkFalsy: true })
        .withMessage('Photo URL is required'),
    check('category')
        .exists({ checkFalsy: true })
        .withMessage('Category is required'),
    handleValidationErrors
];

module.exports = validateContractorInput;
