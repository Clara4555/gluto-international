import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState("");

  // Fetch categories from backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/categories", {
        name,
        subcategories: subcategories.split(",").map((s) => s.trim()),
      });
      setName("");
      setSubcategories("");
      fetchCategories(); // Refresh list
    } catch (err) {
      console.error("Error adding category", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

        <form onSubmit={handleAddCategory} className="mb-8">
          <input
            type="text"
            placeholder="Category Name"
            className="border p-2 mr-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Subcategories (comma separated)"
            className="border p-2 mr-2"
            value={subcategories}
            onChange={(e) => setSubcategories(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Category
          </button>
        </form>

        <div>
          <h3 className="text-lg font-semibold mb-2">All Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat._id} className="border p-2 rounded bg-white shadow">
                <strong>{cat.name}</strong>
                <p className="text-sm text-gray-500">
                  Subcategories: {cat.subcategories.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
