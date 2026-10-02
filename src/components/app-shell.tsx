import { Link, useRouterState } from "@tanstack/react-router";
import { Briefcase, Compass, UserRound, Users } from "lucide-react";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/wordmark";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Discover", icon: Compass, exact: true },
  { to: "/talent", label: "Talent", icon: Users, exact: false },
  { to: "/gigs", label: "Gigs", icon: Briefcase, exact: false },
  { to: "/studio", label: "Studio", icon: UserRound, exact: false },
] as const;

function isActive(pathname: string, item: (typeof NAV)[number]) {
  return item.exact
    ? pathname === item.to
    : pathname === item.to || pathname.startsWith(`${item.to}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg">
      <div className="mx-auto flex min-h-dvh w-full max-w-[90rem]">
        <aside className="sticky top-0 hidden h-dvh w-68 shrink-0 flex-col border-r border-border px-6 py-8 md:flex">
          <Link to="/" className="mb-10">
            <Wordmark />
          </Link>
          <nav className="flex flex-1 flex-col gap-1">
            {NAV.map((item) => {
              const active = isActive(pathname, item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-150",
                    active ? "bg-raised text-fg" : "text-muted hover:bg-raised/60 hover:text-fg",
                  )}
                >
                  <Icon className="size-[1.1rem]" strokeWidth={active ? 2 : 1.6} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <p className="text-xs leading-relaxed text-subtle">
            A room for people who make things.
          </p>
        </aside>

        <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-bg/90 px-5 backdrop-blur-sm md:hidden">
            <Link to="/">
              <Wordmark compact />
            </Link>
          </header>

          <main className="min-h-0 flex-1 px-5 pb-24 pt-6 sm:px-8 md:px-12 md:pb-16 md:pt-10 lg:px-16">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg pb-[env(safe-area-inset-bottom)] md:hidden">
        <ul className="grid grid-cols-4">
          {NAV.map((item) => {
            const active = isActive(pathname, item);
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
    </div>
  );
}
