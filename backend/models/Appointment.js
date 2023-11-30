const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Pending', 'Declined']
    },
    type:{
        type: String,
        enum: ['Quote', 'Consultation', 'Other']
    },
    contractor: {
        type: Schema.Types.ObjectId,
        ref: 'Contractor',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);