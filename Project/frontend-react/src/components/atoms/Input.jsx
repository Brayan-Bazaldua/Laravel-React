import React from "react";

export default function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
    />
  );
}
