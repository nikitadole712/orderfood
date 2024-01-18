const mongoose = require('mongoose');

const { Schema } = mongoose;

const dataSchema = new Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  qty:{
    type: Number,
  }
});
module.exports = mongoose.model('items', dataSchema);
