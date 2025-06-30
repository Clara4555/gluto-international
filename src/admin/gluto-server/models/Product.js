import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    image: {
      type: String, // Image URL
    },
    availability: {
      type: Number, // 0 to 100 percent
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    ean: String,
    weight: String,
    origin: String,
    packaging: String,
    leadTime: String,
    shelfLife: String,
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
