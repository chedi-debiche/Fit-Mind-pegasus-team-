const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false,
    min: 0
  },
  image: {
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    required: false,
    min: 0
  }
});

module.exports = mongoose.model('Product', ProductSchema);
