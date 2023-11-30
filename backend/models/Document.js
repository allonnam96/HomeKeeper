const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    pdfUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contractor: {
        type: Schema.Types.ObjectId,
        ref: 'Contractor',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Document', documentSchema);