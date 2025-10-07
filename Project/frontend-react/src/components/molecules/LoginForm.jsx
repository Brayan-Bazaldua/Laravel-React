// src/components/molecules/LoginForm.jsx

import React, { useState } from "react";
import axios from "axios";
import InputField from "../atoms/Input";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", formData);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/users");
      }
    } catch (err) {
      setError("Credenciales incorrectas o error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        icon="mail"
        type="email"
        name="email"
        placeholder="Email ID"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        icon="lock"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      {error && (
        <p className="text-red-200 text-center text-sm bg-red-500/20 p-2 rounded-md">
          {error}
        </p>
      )}
        <Button type="submit" className="w-full mt-4">
        Iniciar sesión
        </Button>
    </form>
  );
}
