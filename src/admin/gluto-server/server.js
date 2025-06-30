import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // If you want to serve uploaded files

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes); // ✅ Category routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get('/', (req, res) => {
  res.send('Gluto API running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
