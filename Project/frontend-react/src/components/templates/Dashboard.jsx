import React from "react";
import Navbar from "../molecules/Navbar";

export default function DashboardLayout({ children, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar onLogout={onLogout} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
