import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-black border-b-2 border-pink-500">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-pink-500 text-2xl font-bold tracking-wide">BLACKPINK SHOP</div>
        <nav className="hidden md:flex space-x-6 text-white font-medium">
          <a href="/" className="hover:text-pink-400 transition">Home</a>
          <a href="/user/cart" className="hover:text-pink-400 transition">Cart</a>
          <a href="/user/orders" className="hover:text-pink-400 transition">UserOrders</a>
          <a href="/dashboard" className="hover:text-pink-400 transition">Dashboard</a>
          <a href="/about" className="hover:text-pink-400 transition">About Us</a>
          <a href="/contact" className="hover:text-pink-400 transition">Contact</a>
          <a href="/login" className="hover:text-pink-400 transition">Login</a>
          <a href="/signup" className="hover:text-pink-400 transition">Signup</a>
        </nav>
        {/* Optional: Mobile menu icon here */}
      </div>
    </header>
  );
};

export default Navbar;
