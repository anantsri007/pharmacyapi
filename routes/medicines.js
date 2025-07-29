const express = require('express');
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// List all medicines
router.get('/', async (req, res) => {
  const meds = await Medicine.find();
  res.json(meds);
});

// Get medicine by ID
router.get('/:id', async (req, res) => {
  const med = await Medicine.findById(req.params.id);
  if (!med) return res.status(404).json({ message: 'Medicine not found' });
  res.json(med);
});

// Admin: Add medicine
router.post('/', auth, admin, async (req, res) => {
  const { name, brand, price, stockQuantity } = req.body;
  const med = new Medicine({ name, brand, price, stockQuantity });
  await med.save();
  res.status(201).json(med);
});

// Admin: Update medicine
router.put('/:id', auth, admin, async (req, res) => {
  const med = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!med) return res.status(404).json({ message: 'Medicine not found' });
  res.json(med);
});

// Admin: Delete medicine
router.delete('/:id', auth, admin, async (req, res) => {
  const med = await Medicine.findByIdAndDelete(req.params.id);
  if (!med) return res.status(404).json({ message: 'Medicine not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
