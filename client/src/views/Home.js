import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import HomeImg from "../images/blackpink-wallpaper.jpg";
import cartIcon from "../assets/cart.png";
import { api } from "../utils/common.js";

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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 text-gray-900 font-outfit">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-6 md:mb-0 max-w-lg">
          <h1 className="text-5xl font-extrabold text-pink-600 mb-4 leading-tight">
            Discover the <span className="text-pink-700">Best Deals</span>
          </h1>
          <p className="text-lg text-pink-700/80">
            Shop our latest collection and enjoy seamless shopping with exclusive offers.
          </p>
          <input
            type="text"
            placeholder="🔍 Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-6 w-full md:w-auto max-w-md px-4 py-3 rounded-xl shadow-lg border border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50 text-lg bg-white transition-all"
          />
        </div>
        <img
          src={HomeImg}
          alt="Ecommerce"
          className="max-w-md md:max-w-lg object-contain rounded-3xl shadow-2xl animate-fade-in"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-10 pb-32 max-w-7xl mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-[1.03] border-t-4 border-pink-400 p-4 max-w-[360px] mx-auto flex flex-col"
              style={{ minHeight: '320px' }}
            >
              

<ProductCard
  {...product}
  onAddToCart={async () => {
  try {
    await api.post('/cart/add', { productId: product._id, quantity: 1 });
    toast.success(`Added "${product.name}" to cart!`);
  } catch {
    toast.error('Failed to add to cart');
  }
}}

    
  
/>

            </div>
          ))
        ) : (
          <p className="text-center text-pink-600 col-span-full mt-10 text-xl font-semibold">
            No products found
          </p>
        )}
      </div>

      {/* Floating Cart Icon */}
      <Link to="/user/cart" aria-label="Cart">
        <img
          src={cartIcon}
          alt="cart"
          className="fixed bottom-6 right-6 w-20 h-20 p-4 bg-gradient-to-br from-pink-500 to-pink-700 border-4 border-pink-300 shadow-2xl rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 z-50"
        />
      </Link>

      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Home;
