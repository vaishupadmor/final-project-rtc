import React from 'react';
import { ReceiptIndianRupee } from "lucide-react";
import { getReadableTimestamp } from "../utils/common.js";


function OrderCard({ order, onClick }) {
  const { _id, status, products, createdAt, totalBill, deliveryAddress } = order;

  return (
    <div
      className="bg-white border border-pink-200 shadow-md hover:shadow-pink-300 transition-all duration-300 rounded-2xl p-6 relative cursor-pointer"
      onClick={onClick}
    >
      
      {/* Header */}
      <div className="mb-3">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Order ID:</span> {_id}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Ordered On:</span> {getReadableTimestamp(createdAt)}
        </p>
      </div>

      {/* Product List with Images */}
      <div className="space-y-3 mb-4">
        {products.map((product, index) => {
          const { productId, quantity, price } = product;
          const productImage = productId?.images?.[0] || '';

          return (
            <div key={index} className="flex items-center gap-4">
              {productImage ? (
                <img
                  src={productImage}
                  alt={productId?.name}
                  className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                  No image
                </div>
              )}

              <div>
                <p className="text-pink-700 font-semibold">{productId?.name || 'Unknown Product'}</p>
                <p className="text-gray-600 text-sm">
                  ₹{price} × {quantity} = ₹{price * quantity}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total & Address */}
      <div className="mb-2">
        <p className="flex items-center text-gray-800 font-semibold text-lg">
          <ReceiptIndianRupee size={20} className="mr-2 text-pink-500" />
          ₹{totalBill}
        </p>
        <p className="text-sm text-gray-700 mt-1">
          <span className="font-semibold text-gray-800">Delivery:</span> {deliveryAddress}
        </p>
      </div>

      {/* Status Badge */}
      <span
        className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
          status === 'Delivered'
            ? 'bg-green-500 text-white'
            : status === 'Pending'
            ? 'bg-yellow-500 text-white'
            : 'bg-pink-500 text-white'
        }`}
      >
        {status}
      </span>
      
    </div>
  );
}

export default OrderCard;
