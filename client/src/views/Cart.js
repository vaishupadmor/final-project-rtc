import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Input from "../components/Input.js"
import Button from '../components/Button';
import { api } from '../utils/common.js';

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  };

  const removeItemFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    toast.success("Product Removed Successfully");
  };

  useEffect(() => {
    let totalValue = 0;
    cart.forEach(product => {
      totalValue += product.price * product.quantity;
    });
    setTotal(totalValue);
  }, [cart]);

  useEffect(() => {
    loadCart();
  }, []);

  const CheckoutDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-8 rounded-2xl w-[400px] shadow-lg"
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Checkout</h2>
          <Input label="Name" placeholder="Enter your name" val={name} onChange={setName} />
          <Input label="Address" placeholder="Enter your address" val={address} onChange={setAddress} />
          <Input label="Phone" placeholder="Enter your phone number" val={phone} onChange={setPhone} />
          <select
            value={paymentMode}
            onChange={e => setPaymentMode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
          </select>
          <div className="flex justify-center">
            <Button
              label="Complete Order"
              variant="primary"
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsPaymentOpen(true);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const placeOrder = async () => {
    const orderBody = {
      products: cart.map(product => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
      })),
      deliveryAddress: address,
      paymentMode,
      phone,
    };
    await api.post(`/orders`, orderBody);
    toast.success("Order Placed successfully");
    localStorage.removeItem("cart");
    setTimeout(() => {
      window.location.href = "/user/orders";
    }, 2000);
  };

  const PaymentDialog = ({ isPaymentOpen, onClose }) => {
    if (!isPaymentOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
        <div
          className="bg-white p-10 rounded-2xl shadow-xl w-[400px] text-center"
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Complete Your Payment</h2>
          <Button
            label="Complete Payment"
            variant="primary"
            onClick={() => {
              toast.success("Payment successful");
              placeOrder();
              setIsPaymentOpen(false);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      <h1 className="text-4xl font-bold text-center text-blue-600 py-10">My Cart</h1>

      <div className="flex flex-col items-center px-4">
        {cart.length === 0 ? (
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map(({ image, name, price, productId, quantity }) => {
            const totalValue = price * quantity;
            return (
              <div
                key={productId}
                className="bg-white shadow-lg rounded-2xl overflow-hidden m-4 px-6 py-5 w-full max-w-3xl flex flex-col md:flex-row items-center relative transition-transform hover:-translate-y-1"
              >
                <img
                  src={image}
                  alt={name}
                  className="h-32 object-contain mx-auto md:mx-0 md:mr-6"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                  <p className="text-lg text-gray-600">₹ {price} /-</p>
                  <p className="text-lg text-gray-600">Quantity: {quantity}</p>
                  <p className="text-lg font-semibold text-blue-600">Total: ₹ {totalValue} /-</p>
                </div>
                <button
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 text-sm rounded-full transition"
                  onClick={() => removeItemFromCart(productId)}
                >
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>

      {cart.length > 0 && (
        <div className="flex justify-center items-center py-6">
          <span className="text-2xl font-bold text-gray-700 mr-6">Total: ₹ {total} /-</span>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg transition"
            onClick={() => setIsCheckoutOpen(true)}
          >
            Checkout
          </button>
        </div>
      )}

      <CheckoutDialog isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <PaymentDialog isPaymentOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Cart;
