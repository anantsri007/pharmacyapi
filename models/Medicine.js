const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  stockQuantity: Number
});

module.exports = mongoose.model('Medicine', medicineSchema);
