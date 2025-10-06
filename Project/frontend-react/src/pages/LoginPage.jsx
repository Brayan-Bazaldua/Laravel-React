import React from "react";
import PageLayout from "../components/templates/PageLayout-new";

import LoginForm from "../components/molecules/LoginForm";

export default function LoginPage({ onLoginSuccess }) {
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </PageLayout>
  );
}
