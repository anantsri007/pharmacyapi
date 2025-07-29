const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medicines: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
      quantity: Number
    }
  ],
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
