import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-2 border-pink-500 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-20">
        
        <div>
          <h2 className="text-pink-500 text-xl font-bold mb-2">BLACKPINK SHOP</h2>
          <p className="text-sm text-gray-300">
            Your ultimate destination for exclusive BLACKPINK merch & K-pop treasures.
          </p>
        </div>

        <div>
          <h3 className="text-pink-400 font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#" className="hover:text-pink-400 transition">Store</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Lookbook</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Join BLINK</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-pink-400 font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#"><img className="w-6 hover:scale-110 transition" src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Instagram" /></a>
            <a href="#"><img className="w-6 hover:scale-110 transition" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Twitter" /></a>
            <a href="#"><img className="w-6 hover:scale-110 transition" src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="YouTube" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-6">
        © 2025 BLACKPINK SHOP. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
