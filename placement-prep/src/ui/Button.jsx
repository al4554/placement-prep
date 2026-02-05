export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = ""
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:scale-95",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:scale-95",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:scale-95"
  };

  const disabledClasses =
    "opacity-50 cursor-not-allowed active:scale-100";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${(disabled || loading) && disabledClasses}
        ${className}
      `}
    >
      {/* Loading Spinner */}
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}

      {/* Button Text */}
      <span>{loading ? "Please wait..." : children}</span>
    </button>
  );
}
