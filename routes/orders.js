const express = require('express');
const Order = require('../models/Order');
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');
const router = express.Router();

// Place an order
router.post('/', auth, async (req, res) => {
  const { medicineId, quantity } = req.body;
  if (!medicineId || !quantity) return res.status(400).json({ message: 'medicineId and quantity required' });

  const medicine = await Medicine.findById(medicineId);
  if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
  if (medicine.stockQuantity < quantity) return res.status(400).json({ message: 'Insufficient stock' });

  medicine.stockQuantity -= quantity;
  await medicine.save();

  const totalPrice = medicine.price * quantity;
  const order = new Order({
    user: req.user._id,
    medicines: [{ medicine: medicine._id, quantity }],
    totalPrice
  });
  await order.save();
  res.status(201).json(order);
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('medicines.medicine');
  res.json(orders);
});

module.exports = router;
