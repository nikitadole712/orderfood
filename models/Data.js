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
  varients: {
    type: Array,
    required: true,
  },
  prices: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});
module.exports = mongoose.model('items', dataSchema);
