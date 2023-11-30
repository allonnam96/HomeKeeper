const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }, 
    hashedPassword: {
      type: String,
      required: true
    }, 
    birthday: {
      type: Date,
      required: true
  },
  
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);