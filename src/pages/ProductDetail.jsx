import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Product not found", err));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item._id === product._id);
    if (!exists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart ✅");
      navigate("/cart");
    } else {
      alert("Product already in cart!");
    }
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col md:flex-row gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/3 object-cover rounded shadow"
      />

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-green-700 font-semibold text-lg mb-4">₦{product.price}</p>
        <div className="mb-4">
          <p className="mb-1"><strong>Category:</strong> {product.category}</p>
          <p className="mb-1"><strong>Subcategory:</strong> {product.subcategory}</p>
          <p className="mb-1"><strong>Availability:</strong> {product.availability}%</p>
          <p className="mb-1"><strong>EAN/UPC:</strong> {product.ean}</p>
          <p className="mb-1"><strong>Weight:</strong> {product.weight}</p>
          <p className="mb-1"><strong>Origin:</strong> {product.origin}</p>
          <p className="mb-1"><strong>Packaging:</strong> {product.packaging}</p>
          <p className="mb-1"><strong>Lead Time:</strong> {product.leadTime}</p>
          <p className="mb-1"><strong>Shelf Life:</strong> {product.shelfLife}</p>
        </div>
        <p className="text-sm mb-4">{product.description}</p>
        <button
          onClick={addToCart}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
