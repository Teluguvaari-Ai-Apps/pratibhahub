import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-7 text-fg", className)}
    >
      <circle
        cx="16"
        cy="16"
        r="12.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="16" cy="16" r="3.4" fill="currentColor" />
      <path
        d="M16 4.2v4.4M16 23.4v4.4M4.2 16h4.4M23.4 16h4.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-fg", className)}>
      <Mark className={compact ? "size-6" : "size-7"} />
      <span className="leading-none">
        <span className="font-display text-lg tracking-tight">Pratiba</span>
        <span className="text-sm font-medium tracking-wide text-muted">
          Hub
        </span>
      </span>
    </span>
  );
}
