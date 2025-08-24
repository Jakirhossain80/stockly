
export default function Spinner({ size = "md", label = "Loading…" }) {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };
  return (
    <div className="inline-flex items-center gap-3" role="status" aria-live="polite">
      <span
        className={`${sizes[size]} animate-spin rounded-full border-2 border-current border-t-transparent text-[#16A34A] dark:text-[#22C55E]`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
