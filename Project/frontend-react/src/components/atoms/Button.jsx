// components/atoms/Button.jsx
export default function Button({ children, variant = "primary", ...props }) {
  const styles =
    variant === "primary"
      ? "bg-indigo-600 hover:bg-indigo-700"
      : "bg-gray-600 hover:bg-gray-700";
  return (
    <button
      {...props}
      className={`text-white px-4 py-2 rounded-xl transition ${styles}`}
    >
      {children}
    </button>
  );
}
