import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-3">{user.id}</td>
      <td className="px-4 py-3">{user.name}</td>
      <td className="px-4 py-3">{user.email}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{user.created_at}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{user.updated_at}</td>
      <td className="px-4 py-3 flex justify-center gap-3">
        <button onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-800">
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(user.id)} className="text-red-600 hover:text-red-800">
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
