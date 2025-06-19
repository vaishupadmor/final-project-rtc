import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster, toast } from 'react-hot-toast';
import contactImg from '../images/contact-image.webp'; // Add themed image

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! Thank you 💌');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 text-gray-900 font-outfit">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold text-pink-600 mb-8 text-center">Contact Us</h2>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl p-8 rounded-3xl w-full md:w-1/2"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full mb-4 px-4 py-3 rounded-xl border border-pink-300 focus:ring-4 focus:ring-pink-400 outline-none"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full mb-4 px-4 py-3 rounded-xl border border-pink-300 focus:ring-4 focus:ring-pink-400 outline-none"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
              className="w-full mb-4 px-4 py-3 rounded-xl border border-pink-300 focus:ring-4 focus:ring-pink-400 outline-none resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition"
            >
              Send Message
            </button>
          </form>

          <img
            src={contactImg}
            alt="Contact Blackpink"
            className="rounded-3xl shadow-2xl max-w-md w-full object-cover"
          />
        </div>
      </div>

      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Contact;
