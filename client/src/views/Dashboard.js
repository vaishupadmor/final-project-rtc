import React, { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../utils/common';
import {
  Mail as MailIcon,
  Truck as TruckIcon,
  IdCard as NameIcon,
  KeySquare as RoleIcon,
  LogOut as LogOutIcon
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserDetailRow = ({ icon, value }) => {
  return (
    <p className="flex items-center mb-4 text-lg text-gray-800">
      {icon}
      <span className="ms-4">{value}</span>
    </p>
  );
};

function Dashboard() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    toast.success('Logout successful');
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 text-gray-900 font-outfit flex flex-col">
      <Navbar />

      <h1 className="text-center mt-10 text-4xl font-extrabold text-pink-500 drop-shadow-sm">
        🎀 Welcome to Your Dashboard
      </h1>

      <div className="bg-white w-full max-w-xl mx-auto mt-8 p-10 mb-16 rounded-3xl shadow-xl border border-pink-200 transition-all duration-300">
        {/* Navigation Buttons */}
        <div className="flex justify-around flex-wrap gap-4 mb-10">
          {[
            { label: 'My Orders', icon: <TruckIcon size={22} />, link: "/user/orders" },
            { label: 'Track Order', icon: <TruckIcon size={22} />, link: "/user/track" },
            { label: 'Wishlist', icon: <TruckIcon size={22} />, link: "/user/wishlist" },
            { label: 'Support', icon: <TruckIcon size={22} />, link: "/user/support" },
          ].map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="flex flex-col items-center text-center text-sm bg-pink-100 text-pink-700 px-4 py-3 rounded-lg shadow-md hover:bg-pink-200 transition duration-200"
            >
              {item.icon}
              <span className="mt-1 font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User Details */}
        <UserDetailRow icon={<NameIcon className="text-pink-500" />} value={user?.name} />
        <UserDetailRow icon={<MailIcon className="text-pink-500" />} value={user?.email} />
        <UserDetailRow icon={<RoleIcon className="text-pink-500" />} value={user?.role} />

        {/* Logout Button */}
        <button
          type="button"
          className="mx-auto block bg-red-500 hover:bg-red-600 text-white px-6 py-2 mt-8 rounded-full shadow-md transition duration-300"
          onClick={handleLogout}
        >
          Logout <LogOutIcon className="inline ms-2" size={20} />
        </button>
      </div>

      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Dashboard;
