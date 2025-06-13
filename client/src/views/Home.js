import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import HomeImg from "./Ecommerce-page-bro.png";
import cartIcon from "../assets/cart.png";
import { Link } from 'react-router-dom';
import { api } from "../utils/common.js";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const response = await api.get(`/products?limit=100&search=${search}`);
      if (response.data?.success) {
        setProducts(response.data.data);
      } else {
        toast.error(response.data?.message || "Failed to load products");
      }
    } catch (error) {
      console.error("Error loading products:", error);
      const message = error.response?.data?.message || error.message || "Unexpected error occurred";
      toast.error(message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Discover the Best Deals</h1>
          <p className="text-lg text-gray-600">Shop our latest collection and enjoy seamless shopping.</p>
        </div>
        <img
          src={HomeImg}
          alt="Ecommerce"
          className="w-full max-w-md md:max-w-lg object-contain animate-fade-in"
        />
      </div>

      {/* Search Bar */}
      <div className="flex justify-center px-4 mb-10">
        <input
          type="text"
          placeholder="🔍 Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl p-3 rounded-xl shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition-all bg-white"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 px-4 md:px-10 pb-28 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 p-6 w-full max-w-[420px] mx-auto border-t-4 border-orange-400"
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      {/* Floating Cart Icon */}
      <Link to="user/cart">
        <img
          src={cartIcon}
          alt="cart"
          className="fixed bottom-6 right-6 w-16 h-16 md:w-20 md:h-20 p-3 bg-orange-500 border-2 border-gray-300 shadow-2xl rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 z-50"
        />
      </Link>

      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Home;
