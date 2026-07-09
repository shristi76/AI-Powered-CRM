interface Props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  subtitle,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        w-full
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition
        duration-200
        hover:shadow-md
        sm:p-8
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-bold text-slate-900">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-2 text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}