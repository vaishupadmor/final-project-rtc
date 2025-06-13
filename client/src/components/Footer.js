import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-600 text-white text-center py-6 mt-10">
      <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
