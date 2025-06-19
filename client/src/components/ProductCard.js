import React, { useState } from 'react';
import { shortText } from "../utils/common.js";
import { Plus as PlusIcon, Minus as MinusIcon, ChevronLeft as LeftArrow, ChevronRight as RightArrow } from 'lucide-react';
import Button from './Button.js';
import toast, { Toaster } from "react-hot-toast";

function ProductCard({ _id, name, price, currentPrice, shortDescription, tags = [], images = [], category }) {
  const [currentImage, setCurrentImage] = useState(images[0] || "");
  const [quantity, setQuantity] = useState(1);

  const leftArrowClick = () => {
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentImage(images[newIndex]);
  };

  const rightArrowClick = () => {
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentImage(images[newIndex]);
  };

  const handleAddToCart = () => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const product = {
      productId: _id,
      quantity: quantity,
      name: name,
      image: currentImage,
      price: currentPrice,
    };

    const existingProductIndex = cart.findIndex(item => item.productId === _id);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity = quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added successfully");
  };

  return (
   <div>
     <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-5 max-w-[360px] mx-auto flex flex-col">
      {/* Category Tag */}
      {category && (
        <span className="self-start bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
          {category}
        </span>
      )}

      {/* Image Carousel */}
      <div className="relative h-36 mb-4 flex items-center justify-center">
        <LeftArrow
          size={28}
          className="absolute left-2 text-pink-500 cursor-pointer hover:text-pink-700 transition"
          onClick={leftArrowClick}
        />
        {currentImage ? (
          <img
            src={currentImage}
            alt={name}
            className="h-32 object-contain rounded-lg shadow-md"
          />
        ) : (
          <div className="h-32 w-full bg-pink-100 rounded-lg flex items-center justify-center text-pink-400">
            No Image
          </div>
        )}
        <RightArrow
          size={28}
          className="absolute right-2 text-pink-500 cursor-pointer hover:text-pink-700 transition"
          onClick={rightArrowClick}
        />
      </div>

      {/* Tags */}
      <div className="mb-2 flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Name & Description */}
      <h2 className="font-extrabold text-lg text-pink-700 mb-1">{shortText(name, 30)}</h2>
      <p className="text-gray-600 text-sm mb-3">{shortText(shortDescription, 70)}</p>

      {/* Price */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-gray-400 line-through text-base">₹{price}</span>
        <span className="text-pink-600 font-bold text-xl">₹{currentPrice}</span>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-center gap-5 mb-5">
        <PlusIcon
          className="cursor-pointer text-pink-600 hover:text-pink-800 transition"
          size={24}
          onClick={() => setQuantity(quantity + 1)}
        />
        <span className="text-xl font-semibold">{quantity}</span>
        <MinusIcon
          className={`cursor-pointer text-pink-600 hover:text-pink-800 transition ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          size={24}
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        />
      </div>

      {/* Add to Cart Button */}
      <Button label="Add to Cart" variant="primary" onClick={handleAddToCart} />

      
    </div>
    
   </div>
    
  );
}

export default ProductCard;
