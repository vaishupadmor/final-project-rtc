import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">ShopEase</Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
        <Link to="/user/cart" className="text-gray-700 hover:text-blue-600 transition">Cart</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
