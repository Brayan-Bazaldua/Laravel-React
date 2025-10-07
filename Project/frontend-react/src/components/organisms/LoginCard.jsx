// components/organisms/LoginCard.jsx
import LoginForm from "../molecules/LoginForm";
import Avatar from "../atoms/Avatar";

export default function LoginCard() {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-sm w-full">
      <div className="flex flex-col items-center mb-6">
        <Avatar size="lg" />
        <h2 className="text-xl text-white mt-3 font-semibold">Welcome Back</h2>
      </div>
      <LoginForm />
    </div>
  );
}
