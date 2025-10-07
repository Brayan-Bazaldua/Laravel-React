import React from "react";


import Logo from "../components/atoms/Logo";
import Button from "../components/atoms/Button";
import LoginForm from "../components/molecules/LoginForm";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#3C5080] to-[#4491D3]">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-white/20">
        <div className="flex flex-col items-center mb-6">
          <Logo />
          <h2 className="text-white text-2xl font-semibold">Welcome Back</h2>
        </div>
        <LoginForm />
        
      </div>
    </div>
  );
}
