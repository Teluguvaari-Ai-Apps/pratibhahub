import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { TalentCard } from "@/components/talent-card";
import { Input } from "@/components/ui/input";
import { CATEGORIES, TALENTS, type CategoryId } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { z } from "zod";

const searchSchema = z.object({
  craft: z.string().optional(),
});

export const Route = createFileRoute("/talent/")({
  validateSearch: searchSchema,
  component: TalentIndex,
});

function TalentIndex() {
  const { craft } = Route.useSearch();
  const initial: CategoryId | "all" = CATEGORIES.some((c) => c.id === craft)
    ? (craft as CategoryId)
    : "all";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CategoryId | "all">(initial);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TALENTS.filter((t) => {
      if (filter !== "all" && t.category !== filter) return false;
      if (!q) return true;
      const hay = `${t.name} ${t.role} ${t.city} ${t.skills.join(" ")} ${t.bio}`.toLowerCase();
      return hay.includes(q);
    });
  }, [filter, query]);

  return (
    <div className="flex flex-col gap-5">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Directory
        </p>
        <h1 className="font-display mt-1 text-3xl tracking-tight">Talent</h1>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, craft, city"
          className="pl-10"
          aria-label="Search talent"
        />
      </div>

      <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {(["all", ...CATEGORIES.map((c) => c.id)] as const).map((id) => {
          const label = id === "all" ? "All" : CATEGORIES.find((c) => c.id === id)!.label;
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
          No one matches that. Try another craft or a shorter search.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {list.map((t) => (
            <TalentCard key={t.id} talent={t} />
          ))}
        </div>
      )}
    </div>
  );
}
