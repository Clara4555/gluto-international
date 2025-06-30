import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen shadow p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <ul className="space-y-4">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/categories">Manage Categories</Link></li>
        <li><Link to="/admin/products">Manage Products</Link></li>
      </ul>
    </div>
  );
}
