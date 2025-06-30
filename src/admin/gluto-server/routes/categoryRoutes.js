import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// ➕ Create new category
router.post('/', async (req, res) => {
  try {
    const { name, subcategories } = req.body;
    const category = new Category({ name, subcategories });
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
