// components/templates/LoginTemplate.jsx
import LoginCard from "../organisms/LoginCard";

export default function LoginTemplate() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700"
      style={{
        backgroundImage: "url('/src/assets/bg-login.jpg')",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <LoginCard />
    </div>
  );
}
