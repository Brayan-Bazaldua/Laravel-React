import React from "react";
import { LogOut } from "lucide-react";
import Logo from "../atoms/Logo";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina cualquier token (si lo usas)
    localStorage.removeItem("token");

    // Redirige al login
    navigate("/login");
  };

  return (
    <nav className="bg-[#467FB0] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold tracking-wide m-0">Panel de Administración</h1>
        <div className="flex items-center gap-4">
          <Logo className="w-10 h-10" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-white text-red-500 px-3 py-1.5 rounded-md font-medium hover:bg-gray-100 transition"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
