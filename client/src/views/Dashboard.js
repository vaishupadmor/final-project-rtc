import React, { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../utils/common';
import { Mail as MailIcon, Truck as TruckIcon, IdCard as NameIcon, KeySquare as RoleIcon, LogOut as LogOutIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserDetailRow = ({ icon, value }) => {
  return (
    <p className="flex items-center mb-4 text-lg text-gray-700">
      {icon}
      <span className="ms-4">{value}</span>
    </p>
  );
};

function Dashboard() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    toast.success("Logout successful");
    logout();
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      <Navbar />

      <h1 className="text-center my-8 text-4xl font-bold text-blue-600">Dashboard</h1>

      <div className="bg-white w-full max-w-xl mx-auto p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Navigation Links */}
        <div className="flex justify-around flex-wrap gap-4 mb-10">
          {["My Orders", "Track Order", "Wishlist", "Support"].map((label, index) => (
            <Link
              to="/user/orders"
              key={index}
              className="text-center text-sm bg-blue-100 text-blue-700 px-4 py-2 rounded-md shadow-sm hover:bg-blue-200 transition"
            >
              <TruckIcon className="mx-auto mb-1" size={22} />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* User Info */}
        <UserDetailRow icon={<NameIcon className="text-blue-600" />} value={user?.name} />
        <UserDetailRow icon={<MailIcon className="text-blue-600" />} value={user?.email} />
        <UserDetailRow icon={<RoleIcon className="text-blue-600" />} value={user?.role} />

        {/* Logout Button */}
        <button
          type="button"
          className="mx-auto block bg-red-500 hover:bg-red-600 text-white px-6 py-2 mt-6 rounded-full transition duration-300"
          onClick={handleLogout}
        >
          Logout <LogOutIcon className="inline ms-2" />
        </button>
      </div>

    
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Dashboard;
