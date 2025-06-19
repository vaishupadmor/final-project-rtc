import React from 'react';

function Button({ label, onClick, variant = "primary" }) {
  const base = "px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 shadow-md";

  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
    danger: "bg-gradient-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {label}
    </button>
  );
}

export default Button;
