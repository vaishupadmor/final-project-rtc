import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-black border-b-2 border-pink-500">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-pink-500 text-2xl font-bold tracking-wide">BLACKPINK SHOP</div>
        <nav className="hidden md:flex space-x-6 text-white font-medium">
          <Link to="/" className="hover:text-pink-400 transition">Home</Link>
          <Link to="/user/cart" className="hover:text-pink-400 transition">Cart</Link>
          <Link to="/user/orders" className="hover:text-pink-400 transition">UserOrders</Link>
          <Link to="/dashboard" className="hover:text-pink-400 transition">Dashboard</Link>
          <Link to="/about" className="hover:text-pink-400 transition">About Us</Link>
          <Link to="/contact" className="hover:text-pink-400 transition">Contact</Link>
          <Link to="/login" className="hover:text-pink-400 transition">Login</Link>
          <Link to="/signup" className="hover:text-pink-400 transition">Signup</Link>
        </nav>
        {/* Optional: Mobile menu icon here */}
      </div>
    </header>
  );
};

export default Navbar;
