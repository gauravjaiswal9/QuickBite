// backend/routes/foods.js
const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Owner adds a new food item
router.post('/', protect, authorizeRoles('owner'), async (req, res) => {
  try {
    const foodItem = await FoodItem.create({ ...req.body, owner: req.user._id });
    res.status(201).json(foodItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all food items (public)
router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
