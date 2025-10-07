// components/molecules/LoginForm.jsx
import Input from "../atoms/InputField";
import Button from "../atoms/Button";
import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-4">
      <Input label="Email ID" icon={Mail} type="email" placeholder="email@example.com" />
      <Input label="Password" icon={Lock} type="password" placeholder="••••••••" />
      <div className="flex justify-between items-center">
        <Button type="submit">Login</Button>
        <a href="#" className="text-sm text-gray-400 hover:text-white">
          Forgot Password?
        </a>
      </div>
      <a href="#" className="text-center text-sm text-indigo-400 hover:text-indigo-200">
        Register
      </a>
    </form>
  );
}
