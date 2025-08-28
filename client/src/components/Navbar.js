import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-black border-b-2 border-pink-500">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-pink-500 text-2xl font-bold tracking-wide">BLACKPINK SHOP</div>
        <nav className="hidden md:flex space-x-6 text-white font-medium">
          <Link href="/" className="hover:text-pink-400 transition">Home</Link>
          <Link href="/user/cart" className="hover:text-pink-400 transition">Cart</Link>
          <Link href="/user/orders" className="hover:text-pink-400 transition">UserOrders</Link>
          <Link href="/dashboard" className="hover:text-pink-400 transition">Dashboard</Link>
          <Link href="/about" className="hover:text-pink-400 transition">About Us</Link>
          <Link href="/contact" className="hover:text-pink-400 transition">Contact</Link>
          <Link href="/login" className="hover:text-pink-400 transition">Login</Link>
          <Link href="/signup" className="hover:text-pink-400 transition">Signup</Link>
        </nav>
        {/* Optional: Mobile menu icon here */}
      </div>
    </header>
  );
};

export default Navbar;
