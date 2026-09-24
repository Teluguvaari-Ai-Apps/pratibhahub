import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { GigCard } from "@/components/gig-card";
import { Portrait } from "@/components/portrait";
import { TalentCard } from "@/components/talent-card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, GIGS, TALENTS, categoryOf } from "@/data/catalog";
import { useHub } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Discover });

function Discover() {
  const crafts = useHub((s) => s.crafts);
  const profile = useHub((s) => s.profile);
  const featured =
    TALENTS.find((t) => t.featured && crafts.includes(t.category)) ??
    TALENTS.find((t) => t.featured) ??
    TALENTS[0];
  const forYou = TALENTS.filter((t) => t.id !== featured.id)
    .sort((a, b) => {
      const aHit = crafts.includes(a.category) ? 0 : 1;
      const bHit = crafts.includes(b.category) ? 0 : 1;
      return aHit - bHit;
    })
    .slice(0, 6);
  const openGigs = GIGS.filter(
    (g) => crafts.length === 0 || crafts.includes(g.category),
  ).slice(0, 6);
  const greeting = profile.name ? profile.name.split(" ")[0] : "there";
  const cat = categoryOf(featured.category);

  return (
    <div className="flex flex-col gap-9">
      <header className="rise">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Discover
        </p>
        <h1 className="font-display mt-1 text-3xl tracking-tight">
          Hello, {greeting}.
        </h1>
        <p className="mt-1 text-sm text-muted">
          Talent on the floor, and rooms still open.
        </p>
      </header>

      <Link
        to="/talent/$id"
        params={{ id: featured.id }}
        className="rise rise-2 relative block overflow-hidden rounded-2xl"
      >
        <div className="aspect-4/5">
          <Portrait src={featured.photo} alt={featured.name} priority />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <Badge tone="accent">Featured · {cat.label}</Badge>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-fg">
            {featured.name}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {featured.role} in {featured.city}. {featured.lookingFor}.
          </p>
        </div>
      </Link>

      <section className="rise rise-3">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl tracking-tight">Crafts</h2>
        </div>
        <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 snap-x snap-mandatory">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/talent"
              search={{ craft: c.id }}
              className="relative h-28 w-40 shrink-0 snap-start overflow-hidden rounded-xl"
            >
              <Portrait src={c.cover} alt="" />
              <div className="absolute inset-0 bg-bg/45" />
              <span className="absolute inset-x-0 bottom-0 p-3 font-medium text-fg">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl tracking-tight">For you</h2>
          <Link
            to="/talent"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
          >
            All talent
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {forYou.map((t) => (
            <TalentCard key={t.id} talent={t} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl tracking-tight">Open rooms</h2>
          <Link
            to="/gigs"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
          >
            All gigs
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 snap-x snap-mandatory">
          {openGigs.map((g) => (
            <GigCard key={g.id} gig={g} />
          ))}
        </div>
      </section>
    </div>
  );
}
