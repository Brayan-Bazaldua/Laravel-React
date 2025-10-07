import React, { useState } from "react";
import Button from "../atoms/Button";

export default function UserModal({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  editingUser,
}) {
  const [passwordError, setPasswordError] = useState("");

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();

    if (!editingUser) {
      // Solo validar contraseña al crear
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Las contraseñas no coinciden");
        return;
      }
    }

    setPasswordError("");
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {editingUser ? "Editar Usuario" : "Agregar Usuario"}
        </h2>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#467FB0] focus:border-[#467FB0]"
              required
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Correo</label>
            <input
              type="email"
              placeholder="Correo"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#467FB0] focus:border-[#467FB0]"
              required
            />
          </div>

          {/* Contraseña (solo al agregar usuario) */}
          {!editingUser && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#467FB0] focus:border-[#467FB0]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#467FB0] focus:border-[#467FB0]"
                  required
                />
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-md"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#467FB0] text-white hover:bg-[#356f96] px-4 py-2 rounded-md"
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
