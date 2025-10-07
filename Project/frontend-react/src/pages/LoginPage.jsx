import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", formData);

      if (res.status === 200) {
        console.log("✅ Login exitoso:", res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/users"); // ✅ redirección sin recargar
      }
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      setError("Credenciales incorrectas o error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-500">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-white/20">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-white/20 mb-4" />
          <h2 className="text-white text-2xl font-semibold">Welcome Back</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-white/20 rounded-md px-3 py-2">
            <Mail className="text-white mr-2" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent w-full text-white placeholder-gray-300 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center bg-white/20 rounded-md px-3 py-2">
            <Lock className="text-white mr-2" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent w-full text-white placeholder-gray-300 focus:outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-red-200 text-center text-sm bg-red-500/20 p-2 rounded-md">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-white text-indigo-600 font-semibold py-2 rounded-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            {loading ? "Cargando..." : "LOGIN"}
          </button>
        </form>

        <button className="w-full mt-4 text-white border border-white/30 py-2 rounded-md hover:bg-white/20 transition">
          REGISTER
        </button>
      </div>
    </div>
  );
}
