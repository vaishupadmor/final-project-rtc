import React from 'react';

function Button({ label, onClick, variant = "primary" }) {
  const base = "px-6 py-2 rounded-full font-semibold text-white transition-all";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-gray-400 hover:bg-gray-500",
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
