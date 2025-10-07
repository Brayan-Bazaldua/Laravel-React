import React from "react";
import { LogOut, UserCircle2 } from "lucide-react";

export default function Navbar({ onLogout }) {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold tracking-wide">Panel de Administración</h1>
        <div className="flex items-center gap-4">
          <UserCircle2 size={24} className="text-white" />
          <button
            onClick={onLogout}
            className="flex items-center gap-1 bg-white text-indigo-600 px-3 py-1.5 rounded-md font-medium hover:bg-gray-100 transition"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
