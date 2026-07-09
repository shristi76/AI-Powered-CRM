import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  variant = "primary",
}: Props) {
  const variants = {
    primary:
      "bg-teal-700 text-white hover:bg-teal-800",

    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-6
        py-3
        font-semibold
        transition-all
        duration-200
        shadow-sm
        hover:shadow-md
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    >
      {loading && (
        <Loader2
          className="h-4 w-4 animate-spin"
        />
      )}

      {children}
    </button>
  );
}