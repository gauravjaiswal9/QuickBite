// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Customer places an order
router.post('/', protect, authorizeRoles('customer'), async (req, res) => {
  try {
    const order = await Order.create({ customer: req.user._id, items: req.body.items });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Owner views all orders
router.get('/', protect, authorizeRoles('owner'), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name email')
      .populate('items.food');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Customer views his/her orders
router.get('/myorders', protect, authorizeRoles('customer'), async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).populate('items.food');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Owner updates order status
router.put('/:orderId', protect, authorizeRoles('owner'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
