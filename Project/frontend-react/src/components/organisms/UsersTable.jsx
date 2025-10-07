import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function UsersTable({ users = [], onEdit, onDelete }) {
  return (
    <table className="min-w-full border rounded-md">
      <thead className="bg-gray-200 text-gray-700 text-sm">
        <tr>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Nombre</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Creado</th>
          <th className="px-4 py-2 text-left">Actualizado</th>
          <th className="px-4 py-2 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.created_at?.slice(0, 10)}</td>
              <td className="px-4 py-2">{user.updated_at?.slice(0, 10)}</td>
              <td className="px-4 py-2 text-center flex justify-center gap-3">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-4 text-gray-500">
              No hay usuarios registrados
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
