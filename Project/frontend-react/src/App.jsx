import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      {isLoggedIn ? (
        <UsersPage onLogout={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }} />
      ) : (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;
