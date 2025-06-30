import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <h1 className="text-4xl font-bold mb-4 text-green-800">Welcome to Gluto International 🌍</h1>
      <p className="text-center max-w-xl text-gray-600 mb-6">
        We supply quality agricultural and food products to businesses worldwide.
      </p>
      <div className="space-x-4">
        <Link to="/catalog" className="bg-green-600 text-white px-4 py-2 rounded">View Product Catalog</Link>
        <Link to="/contact" className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Contact Us</Link>
      </div>
    </div>
  );
}
