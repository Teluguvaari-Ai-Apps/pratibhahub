import { Link, useRouterState } from "@tanstack/react-router";
import { Briefcase, Compass, UserRound, Users } from "lucide-react";
import type { ReactNode } from "react";
import { PhoneFrame } from "@/components/phone-frame";
import { Wordmark } from "@/components/wordmark";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Discover", icon: Compass, exact: true },
  { to: "/talent", label: "Talent", icon: Users, exact: false },
  { to: "/gigs", label: "Gigs", icon: Briefcase, exact: false },
  { to: "/studio", label: "Studio", icon: UserRound, exact: false },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <PhoneFrame>
      <header className="flex h-12 shrink-0 items-center px-4">
        <Link to="/">
          <Wordmark compact />
        </Link>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-1">
        {children}
      </main>

      <nav className="shrink-0 border-t border-border bg-bg pb-[env(safe-area-inset-bottom)]">
        <ul className="grid grid-cols-4">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.to
              : pathname === item.to || pathname.startsWith(`${item.to}/`);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium tracking-wide",
                    active ? "text-fg" : "text-muted",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2 : 1.6} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </PhoneFrame>
  );
}
