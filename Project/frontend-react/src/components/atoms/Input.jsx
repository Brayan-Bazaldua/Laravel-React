import React from "react";

// components/atoms/Input.jsx
export default function Input({ label, icon: Icon, ...props }) {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-sm text-gray-300 mb-1">{label}</label>}
      <div className="flex items-center bg-white/10 rounded-xl p-2 backdrop-blur-md">
        {Icon && <Icon className="text-gray-400 mr-2" size={18} />}
        <input
          {...props}
          className="bg-transparent outline-none text-white w-full placeholder-gray-400"
        />
      </div>
    </div>
  );
}
