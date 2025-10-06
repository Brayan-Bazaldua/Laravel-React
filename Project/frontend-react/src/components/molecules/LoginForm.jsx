import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import api from "../../services/api";

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLoginSuccess();
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Iniciar sesión</Button>
    </form>
  );
}
