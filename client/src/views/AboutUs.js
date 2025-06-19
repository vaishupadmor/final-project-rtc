import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import aboutImg from '../images/image.jpg';
import { Toaster } from 'react-hot-toast';

function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-pink-100 text-gray-900 font-outfit">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={aboutImg}
            alt="Blackpink Merch"
            className="rounded-3xl shadow-2xl max-w-md w-full object-cover"
          />
          <div>
            <h2 className="text-4xl font-extrabold text-pink-600 mb-4">About Us</h2>
            <p className="text-lg text-gray-700 mb-4">
              Welcome to the ultimate destination for <strong>Blackpink</strong> fans! We're a passionate
              community that celebrates everything about Jennie, Lisa, Rosé, and Jisoo.
            </p>
            <p className="text-lg text-gray-700">
              Our mission is to provide exclusive, high-quality merchandise that reflects the fierce
              and fabulous style of Blackpink. From limited edition apparel to stunning posters and
              K-pop accessories, everything is curated with 💖 love for the BLINKs.
            </p>
          </div>
        </div>
      </div>

      {/* Toaster & Footer at bottom */}
      <Toaster position="bottom-center" />
      <Footer />
    </div>
  );
}

export default AboutUs;
