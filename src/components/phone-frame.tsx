import { Battery, Signal, Wifi } from "lucide-react";
import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg sm:flex sm:items-center sm:justify-center sm:bg-surface sm:py-3">
      <div className="relative mx-auto flex h-dvh w-full max-w-phone flex-col overflow-hidden bg-bg sm:h-phone sm:max-h-phone sm:rounded-3xl sm:shadow-[var(--shadow-border)]">
        <StatusBar />
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div
      className="flex h-8 shrink-0 items-center justify-between px-6 text-xs font-medium tabular-nums text-fg"
      aria-hidden
    >
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <Signal className="size-3.5" strokeWidth={2} />
        <Wifi className="size-3.5" strokeWidth={2} />
        <Battery className="size-3.5" strokeWidth={2} />
      </span>
    </div>
  );
}
