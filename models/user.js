const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 50
  },
  lastName: {
    type: String,
    required: true,
    max: 50
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 100
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 50
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;