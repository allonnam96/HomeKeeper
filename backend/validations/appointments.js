const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors')

const validateAppointmentInput = [
    check('appointmentDate')
        .exists({ checkFalsy: true })
        .withMessage('Appointment date is required'),
    check('status')
        .exists({ checkFalsy: true })
        .withMessage('status is required'),
    check('contractor')
        .exists({ checkFalsy: true })
        .withMessage('contractor is required'),
    check('user')
        .exists({ checkFalsy: true })
        .withMessage('user is required'),
    handleValidationErrors
];

module.exports = validateAppointmentInput;