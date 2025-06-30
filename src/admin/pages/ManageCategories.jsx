import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState("");

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
      fetchCategories();
    } catch (err) {
      console.error("Error adding category", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category", err);
    }
  };

  const handleEditCategory = async (id, updatedName, updatedSubcats) => {
    try {
      await axios.put(`http://localhost:5000/api/categories/${id}`, {
        name: updatedName,
        subcategories: updatedSubcats.split(",").map((s) => s.trim()),
      });
      fetchCategories();
    } catch (err) {
      console.error("Error updating category", err);
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
          <ul className="space-y-4">
            {categories.map((cat) => (
              <EditableCategory
                key={cat._id}
                category={cat}
                onDelete={handleDeleteCategory}
                onUpdate={handleEditCategory}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function EditableCategory({ category, onDelete, onUpdate }) {
  const [editName, setEditName] = useState(category.name);
  const [editSubcats, setEditSubcats] = useState(category.subcategories.join(", "));

  return (
    <li className="border p-4 rounded bg-white shadow space-y-2">
      <input
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        className="border p-1 w-full"
      />
      <input
        value={editSubcats}
        onChange={(e) => setEditSubcats(e.target.value)}
        className="border p-1 w-full"
      />
      <div className="flex gap-2">
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={() => onUpdate(category._id, editName, editSubcats)}
        >
          Update
        </button>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => onDelete(category._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
