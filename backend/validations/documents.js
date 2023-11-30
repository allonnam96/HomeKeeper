const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors')

const validateDocumentInput = [
    check('pdfUrl')
        .exists({ checkFalsy: true })
        .withMessage('Document is required'),
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Title is required'),
    check('user')
        .exists({ checkFalsy: true })
        .withMessage('User is required'),
    check('contractor')
        .exists({ checkFalsy: true })
        .withMessage('Contractor is required'),
    handleValidationErrors
];

module.exports = validateDocumentInput;