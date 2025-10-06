import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <table className="w-full border-collapse border border-gray-300 mt-6">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Nombre</th>
          <th className="border px-4 py-2">Correo</th>
          <th className="border px-4 py-2">Fecha de creación</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td className="border px-4 py-2">{u.name}</td>
            <td className="border px-4 py-2">{u.email}</td>
            <td className="border px-4 py-2">
              {new Date(u.created_at).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
