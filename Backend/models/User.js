const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('user', UserShema);
