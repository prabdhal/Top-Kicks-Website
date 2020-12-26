const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 50
  }
}, { timestamps: true })

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;