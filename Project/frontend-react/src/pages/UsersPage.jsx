import React from "react";
import UsersTable from "../components/organisms/UsersTable";
import Button from "../components/atoms/Button";

export default function UsersPage({ onLogout }) {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Button onClick={onLogout}>Cerrar sesión</Button>
      </div>
      <UsersTable />
    </div>
  );
}
