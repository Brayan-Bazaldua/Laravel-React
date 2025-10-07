// src/components/atoms/Input.jsx
import React from "react";

import { Mail, Lock } from "lucide-react";

export default function Input({ icon, type, name, placeholder, value, onChange }) {
  const Icon = icon === "mail" ? Mail : Lock;

  return (
    <div className="flex items-center bg-white/20 rounded-md px-3 py-2">
      <Icon className="text-white mr-2" size={18} />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent w-full text-white placeholder-gray-300 focus:outline-none"
        required
      />
    </div>
  );
}
