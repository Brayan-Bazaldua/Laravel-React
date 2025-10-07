import React from "react";
import DashboardLayout from "../components/templates/Dashboard";
import UsersTable from "../components/organisms/UsersTable";

export default function UsersPage() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      <UsersTable />
    </DashboardLayout>
  );
}
