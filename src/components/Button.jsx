export default function Button({ children, onClick, variant = "primary" }) {
  const base =
    "px-4 py-2 rounded-md font-semibold transition-colors duration-200";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}
