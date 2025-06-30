import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Catalog() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get(`http://localhost:5000/api/products?category=${selectedCategory}`);
    setProducts(res.data);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Product Catalog</h1>

      <div className="mb-6 text-center">
        <label className="text-lg mr-2 font-medium">Choose a category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow">
              <img src={product.image} alt={product.name} className="h-32 object-cover w-full mb-2 rounded" />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-green-700 font-semibold mb-2">₦{product.price}</p>
              <Link
                to={`/product/${product._id}`}
                className="text-sm text-blue-600 underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : selectedCategory ? (
        <p className="text-center text-gray-500 mt-8">No products available in this category yet.</p>
      ) : null}
    </div>
  );
}
