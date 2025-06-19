import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getCurrentUser, getReadableTimestamp, api } from "../utils/common";
import OrderCard from "../components/OrderCard";
import HomeIcon from "../assets/Home.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UserOrders() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  const loadUserOrders = async () => {
    if (!user?._id) return;

    try {
      const response = await api.get(`/orders/user/${user._id}`);
      setOrders(response?.data?.data || response?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load orders.");
    }
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    } else {
      toast.error("Please login to access this page");
      setTimeout(() => (window.location.href = "/login"), 2000);
    }
  }, []);

  useEffect(() => {
    if (user) loadUserOrders();
  }, [user]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const OrderViewDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const {
      _id,
      products = [],
      totalBill,
      deliveryAddress,
      phone,
      paymentMode,
      status,
      createdAt,
    } = selectedOrder;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-pink-600 text-3xl font-bold hover:text-pink-800 transition"
            aria-label="Close order details"
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold text-pink-700 mb-6">Order Details</h2>

          <div className="space-y-2 text-gray-700 mb-6">
            <p><strong>Order ID:</strong> {_id}</p>
            <p><strong>Ordered On:</strong> {getReadableTimestamp(createdAt)}</p>
            <p><strong>Payment Mode:</strong> {paymentMode}</p>
            <p><strong>Delivery Address:</strong> {deliveryAddress}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  status.toLowerCase() === "delivered"
                    ? "text-green-600"
                    : status.toLowerCase() === "pending"
                    ? "text-yellow-600"
                    : "text-pink-600"
                }`}
              >
                {status}
              </span>
            </p>
          </div>

          <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
            {products.map(({ productId, quantity, price }) => {
              const { name, images = [] } = productId || {};
              return (
                <div
                  key={productId?._id || name}
                  className="flex items-center space-x-4 border border-pink-200 rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-default"
                >
                  <img
                    src={images[0]}
                    alt={name}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-pink-700">{name}</p>
                    <p className="text-gray-600">₹{price} × {quantity}</p>
                    <p className="font-bold mt-1">Total: ₹{price * quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-right text-2xl font-extrabold text-pink-700 border-t pt-4">
            Bill Amount: ₹{totalBill}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 font-outfit text-gray-900 pb-20 px-6 md:px-10 relative">
        <Link to="/">
          <img
            src={HomeIcon}
            alt="Home"
            className="fixed top-6 right-6 w-16 h-16 cursor-pointer bg-white rounded-full shadow-lg p-2 hover:scale-110 transition-transform duration-300 z-50"
            aria-label="Go to Home"
          />
        </Link>

        <header className="max-w-4xl mx-auto text-center mt-20 mb-10">
          <h1 className="text-5xl font-extrabold text-pink-700 mb-2">My Orders</h1>
          {user?.name && user?.email && (
            <p className="text-pink-600 font-semibold">
              Logged in as {user.name} &mdash; {user.email}
            </p>
          )}
        </header>

        <main className="max-w-6xl mx-auto">
          {orders.length === 0 ? (
            <p className="text-center text-pink-600 text-xl font-medium mt-20">
              No orders found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {orders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsDialogOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <OrderCard order={order} />
                </div>
              ))}
            </div>
          )}
        </main>

        <OrderViewDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedOrder({});
          }}
        />
      </div>

      <Footer />
    </>
  );
}

export default UserOrders;
