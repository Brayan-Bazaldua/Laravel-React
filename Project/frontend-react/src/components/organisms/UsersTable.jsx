import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search, Calendar } from "lucide-react";
import axios from "axios";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Cargar usuarios
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/users");

      // 🔍 Aseguramos que siempre se guarde un array
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.users || [];

      setUsers(data);
    } catch (err) {
      console.error("❌ Error al obtener usuarios:", err);
      setUsers([]);
    }
  };

  // Filtrado seguro
  const filteredUsers = Array.isArray(users)
    ? users.filter((u) => {
        const matchesName = u.name
          ?.toLowerCase()
          .includes(filterName.toLowerCase());
        const matchesDate = filterDate
          ? u.created_at?.startsWith(filterDate)
          : true;
        return matchesName && matchesDate;
      })
    : [];

  // Guardar usuario (crear / editar)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(
          `http://127.0.0.1:8000/api/users/${editingUser.id}`,
          formData
        );
      } else {
        await axios.post("http://127.0.0.1:8000/api/users", formData);
      }
      setShowModal(false);
      setFormData({ name: "", email: "" });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("❌ Error al guardar:", err);
    }
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar este usuario?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
    }
  };

  // Abrir modal (nuevo o editar)
  const openModal = (user = null) => {
    setEditingUser(user);
    setFormData(
      user ? { name: user.name, email: user.email } : { name: "", email: "" }
    );
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Usuarios</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
        >
          <Plus size={18} /> Agregar Usuario
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Filtrar por nombre"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Creado</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actualizado</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{u.id}</td>
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{u.created_at}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{u.updated_at}</td>
                <td className="px-4 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => openModal(u)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="p-4 text-center text-gray-500">No hay usuarios</div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? "Editar Usuario" : "Agregar Usuario"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />

              <input
                type="email"
                placeholder="Correo"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
