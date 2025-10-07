import React from "react";
import clsx from "clsx"; // asegúrate de instalarlo: npm install clsx

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary", // primary (azul), secondary (gris), danger (rojo)
  disabled = false,
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none transition-all duration-200";

  const variants = {
    primary:
      "bg-[#467FB0] text-white hover:bg-[#3a6c93] active:bg-[#325e82]",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  };

  const finalClass = clsx(
    baseStyles,
    variants[variant],
    "px-4 py-2 shadow-sm text-sm", // tamaño estándar
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
