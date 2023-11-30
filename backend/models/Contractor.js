const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const contractorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Contractor', contractorSchema);


