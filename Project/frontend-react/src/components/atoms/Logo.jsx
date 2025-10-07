// src/components/atoms/Logo.jsx
import React from "react";
export default function Logo({ className = "w-28 h-28 mb-4 rounded-full object-cover shadow-lg" }) {
    return <img src="/logo.png" alt="Logo" className={className} />;
  }
  


  