import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function ManageProducts() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    image: "",
    availability: 0,
    price: 0,
    description: "",
    ean: "",
    weight: "",
    origin: "",
    packaging: "",
    leadTime: "",
    shelfLife: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", formData);
      setFormData({
        name: "",
        category: "",
        subcategory: "",
        image: "",
        availability: 0,
        price: 0,
        description: "",
        ean: "",
        weight: "",
        origin: "",
        packaging: "",
        leadTime: "",
        shelfLife: "",
      });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-10">
          <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="border p-2" required />
          <select name="category" value={formData.category} onChange={handleChange} className="border p-2" required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <input name="subcategory" placeholder="Subcategory" value={formData.subcategory} onChange={handleChange} className="border p-2" />
          <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="border p-2" />
          <input type="number" name="availability" placeholder="Availability % (0-100)" value={formData.availability} onChange={handleChange} className="border p-2" />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2" />
          <input name="ean" placeholder="EAN/UPC Code" value={formData.ean} onChange={handleChange} className="border p-2" />
          <input name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} className="border p-2" />
          <input name="origin" placeholder="Origin" value={formData.origin} onChange={handleChange} className="border p-2" />
          <input name="packaging" placeholder="Packaging Details" value={formData.packaging} onChange={handleChange} className="border p-2" />
          <input name="leadTime" placeholder="Lead Time" value={formData.leadTime} onChange={handleChange} className="border p-2" />
          <input name="shelfLife" placeholder="Shelf Life" value={formData.shelfLife} onChange={handleChange} className="border p-2" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 col-span-2" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">Add Product</button>
        </form>

        <h3 className="text-lg font-semibold mb-2">All Products</h3>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow bg-white">
              <img src={product.image} alt={product.name} className="h-32 object-cover w-full mb-2" />
              <h4 className="font-bold">{product.name}</h4>
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              <p className="text-sm text-gray-500">Subcategory: {product.subcategory}</p>
              <p className="text-sm text-green-700">₦{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
