// backend/controllers/recommendationController.js
const Product = require('../models/Product');

// Get product recommendations
const getRecommendations = async (req, res) => {
  try {
    const products = await Product.find().sort({ ratings: -1 }).limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecommendations };
