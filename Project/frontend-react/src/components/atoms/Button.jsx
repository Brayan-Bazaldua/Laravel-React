import React from "react";

export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
    >
      {children}
    </button>
  );
}
