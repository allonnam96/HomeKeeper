const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewStar: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    reviewSummary: {
        type: String,
        required: true 
    },
    contractor: {
        type: Schema.Types.ObjectId,
        ref: "Contractor" }
    }, {
        timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema)