import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { Portrait } from "@/components/portrait";
import { Badge } from "@/components/ui/badge";
import { categoryOf, type Talent } from "@/data/catalog";
import { useHub } from "@/lib/store";
import { cn } from "@/lib/utils";

export function TalentCard({
  talent,
  large = false,
}: {
  talent: Talent;
  large?: boolean;
}) {
  const saved = useHub((s) => s.savedTalent.includes(talent.id));
  const toggle = useHub((s) => s.toggleTalent);
  const cat = categoryOf(talent.category);

  return (
    <article className="group relative">
      <Link
        to="/talent/$id"
        params={{ id: talent.id }}
        className="block overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)]"
      >
        <div
          className={cn(
            "relative overflow-hidden",
            large ? "aspect-3/4" : "aspect-4/5",
          )}
        >
          <Portrait src={talent.photo} alt={talent.name} />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-bg/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="font-display text-lg leading-tight tracking-tight text-fg">
              {talent.name}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {talent.role} · {talent.city}
            </p>
          </div>
        </div>
        {!large && (
          <div className="flex items-center justify-between px-3 py-2.5">
            <Badge>{cat.label}</Badge>
            {talent.available ? (
              <span className="text-xs font-medium uppercase tracking-wider text-live">
                Open
              </span>
            ) : (
              <span className="text-xs font-medium uppercase tracking-wider text-subtle">
                Booked
              </span>
            )}
          </div>
        )}
      </Link>
      <button
        type="button"
        aria-label={saved ? "Remove from saved" : "Save talent"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(talent.id);
        }}
        className="absolute top-2.5 right-2.5 z-10 flex size-10 items-center justify-center rounded-full bg-bg/55 text-fg backdrop-blur-sm transition-[background-color,transform] duration-150 ease-out active:scale-95"
      >
        <Bookmark
          className={cn("size-4", saved && "fill-fg")}
          strokeWidth={1.6}
        />
      </button>
    </article>
  );
}

export function TalentRow({ talent }: { talent: Talent }) {
  const cat = categoryOf(talent.category);
  return (
    <Link
      to="/talent/$id"
      params={{ id: talent.id }}
      className="flex items-center gap-3 rounded-xl p-2 transition-colors duration-150 hover:bg-raised"
    >
      <div className="size-14 overflow-hidden rounded-md">
        <Portrait src={talent.photo} alt={talent.name} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-fg">{talent.name}</p>
        <p className="truncate text-sm text-muted">
          {talent.role} · {talent.city}
        </p>
      </div>
      <Badge>{cat.label}</Badge>
    </Link>
  );
}
