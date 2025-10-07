import React from "react";
import { Search } from "lucide-react";

export default function FilterInput({ label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-[40px] pl-9 pr-3 w-[200px] rounded-md border border-gray-300 bg-white text-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm placeholder-gray-400"
        />
      </div>
    </div>
  );
}
