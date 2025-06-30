import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue"; // ✅ make sure this file exists

import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Information from "./pages/Information";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ManageCategories from "./admin/pages/ManageCategories";
import ManageProducts from "./admin/pages/ManageProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/catalog" element={<Catalogue />} /> {/* ✅ Fix path name here */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/info" element={<Information />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/categories" element={<ManageCategories />} />
        <Route path="/admin/products" element={<ManageProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
