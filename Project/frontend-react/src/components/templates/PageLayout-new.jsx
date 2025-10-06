import React from "react";

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
