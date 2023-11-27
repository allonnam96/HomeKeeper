const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contractors: [{ type: Schema.Types.ObjectId, ref: "Contractor" }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);