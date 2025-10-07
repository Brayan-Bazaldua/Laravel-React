import React, { useEffect, useState } from "react";
import Navbar from "../components/molecules/Navbar";
import UsersTable from "../components/organisms/UsersTable";
import FilterInput from "../components/molecules/FilterInput";
import DateFilter from "../components/molecules/DateFilter";
import Button from "../components/atoms/Button";
import UserModal from "../components/molecules/UserModal";
import { Plus } from "lucide-react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // === Obtener usuarios ===
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("❌ Error al obtener usuarios:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // === Filtrado local ===
  const filteredUsers = users.filter((u) => {
    const matchesName = nameFilter
      ? u.name.toLowerCase().includes(nameFilter.toLowerCase())
      : true;
    const matchesDate = dateFilter
      ? u.created_at?.slice(0, 10) === dateFilter
      : true;
    return matchesName && matchesDate;
  });

  // === Agregar usuario ===
  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setIsModalOpen(true);
  };

  // === Editar usuario ===
  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
    });
    setIsModalOpen(true);
  };

  // === Eliminar usuario ===
  const handleDeleteUser = async (userId) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
      alert("No se pudo eliminar el usuario");
    }
  };

  // === Guardar usuario (crear o editar) ===
  const handleSaveUser = async () => {
    try {
      if (editingUser) {
        const payload = {
          name: formData.name,
          email: formData.email,
        };
        
        if (formData.password) {
          payload.password = formData.password;
        }
        
        await axios.put(`http://127.0.0.1:8000/api/users/${editingUser.id}`, payload);
        
      } 

      await fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ Error al guardar usuario:", error);
      alert("Error al guardar usuario");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#3C5080] to-[#4491D3] flex flex-col">
      <Navbar />

      <main className="flex-1 px-10 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Usuarios</h1>
       
        </div>

        <div className="flex flex-wrap gap-4 mb-6 items-end">
          <FilterInput
            label="Filtrar por nombre"
            placeholder="Buscar nombre..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <DateFilter
            label="Filtrar por fecha"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />

          <Button
            onClick={handleAddUser}
            className="flex items-center gap-2 h-[40px] px-4 border border-gray-300 text-gray-700 bg-gray-400 hover:bg-gray-100 rounded-md text-sm font-medium shadow-sm transition-all"
          >
            <Plus size={16} className="text-black" />
            Agregar Usuario
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <UsersTable
            users={filteredUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </div>
      </main>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        formData={formData}
        setFormData={setFormData}
        editingUser={editingUser}
      />
    </div>
  );

  
}
