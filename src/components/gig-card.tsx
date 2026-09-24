import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Portrait } from "@/components/portrait";
import { Badge } from "@/components/ui/badge";
import { categoryOf, type Gig } from "@/data/catalog";

export function GigCard({ gig }: { gig: Gig }) {
  const cat = categoryOf(gig.category);
  return (
    <Link
      to="/gigs/$id"
      params={{ id: gig.id }}
      className="flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Portrait src={gig.cover} alt="" />
        <div className="absolute left-2.5 top-2.5">
          <Badge tone="accent">{cat.label}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <p className="font-medium leading-snug text-fg">{gig.title}</p>
        <p className="text-sm text-muted">{gig.company}</p>
        <div className="mt-auto flex items-center justify-between pt-1 text-xs text-subtle">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3" strokeWidth={1.75} />
            {gig.city}
          </span>
          <span>{gig.rate}</span>
        </div>
      </div>
    </Link>
  );
}

export function GigRow({ gig }: { gig: Gig }) {
  const cat = categoryOf(gig.category);
  return (
    <Link
      to="/gigs/$id"
      params={{ id: gig.id }}
      className="flex gap-3 overflow-hidden rounded-xl bg-surface p-2.5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="h-[4.75rem] w-[5.5rem] shrink-0 overflow-hidden rounded-md">
        <Portrait src={gig.cover} alt="" />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="truncate font-medium text-fg">{gig.title}</p>
        <p className="truncate text-sm text-muted">{gig.company}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <Badge>{cat.label}</Badge>
          <span className="text-xs text-subtle">
            {gig.city} · {gig.posted}
          </span>
        </div>
      </div>
    </Link>
  );
}
