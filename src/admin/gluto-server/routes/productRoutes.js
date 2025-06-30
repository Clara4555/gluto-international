import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// ➕ Add a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📦 Get all products (optional: filter by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const products = category
      ? await Product.find({ category })
      : await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
