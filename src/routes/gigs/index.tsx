import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { GigRow } from "@/components/gig-card";
import { Input } from "@/components/ui/input";
import { CATEGORIES, GIGS, type CategoryId } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gigs/")({ component: GigsIndex });

function GigsIndex() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CategoryId | "all">("all");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GIGS.filter((g) => {
      if (filter !== "all" && g.category !== filter) return false;
      if (!q) return true;
      const hay = `${g.title} ${g.company} ${g.city} ${g.summary}`.toLowerCase();
      return hay.includes(q);
    });
  }, [filter, query]);

  return (
    <div className="flex flex-col gap-5">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Open rooms
        </p>
        <h1 className="font-display mt-1 text-3xl tracking-tight">Gigs</h1>
        <p className="mt-1 text-sm text-muted">
          Casting, sessions, commissions, and seats on small teams.
        </p>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, house, city"
          className="pl-10"
          aria-label="Search gigs"
        />
      </div>

      <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {(["all", ...CATEGORIES.map((c) => c.id)] as const).map((id) => {
          const label =
            id === "all" ? "All" : CATEGORIES.find((c) => c.id === id)!.label;
          const on = filter === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={cn(
                "h-9 shrink-0 rounded-full px-3.5 text-sm font-medium transition-colors duration-150",
                on ? "bg-accent text-accent-fg" : "bg-raised text-muted",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          Nothing open in that corner. Try another craft.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((g) => (
            <GigRow key={g.id} gig={g} />
          ))}
        </div>
      )}
    </div>
  );
}
