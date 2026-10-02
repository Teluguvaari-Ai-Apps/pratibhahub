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
    .slice(0, 10);
  const openGigs = GIGS.filter(
    (g) => crafts.length === 0 || crafts.includes(g.category),
  ).slice(0, 6);
  const greeting = profile.name ? profile.name.split(" ")[0] : "there";
  const cat = categoryOf(featured.category);

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <header className="rise">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Discover
        </p>
        <h1 className="font-display mt-1 text-3xl tracking-tight md:text-5xl">
          Hello, {greeting}.
        </h1>
        <p className="mt-2 text-sm text-muted md:text-base">
          Talent on the floor, and rooms still open.
        </p>
      </header>

      <Link
        to="/talent/$id"
        params={{ id: featured.id }}
        className="rise rise-2 group relative block overflow-hidden rounded-2xl md:rounded-3xl"
      >
        <div className="aspect-4/5 sm:aspect-21/9 md:aspect-[2.6/1]">
          <Portrait
            src={featured.photo}
            alt={featured.name}
            priority
            position="center"
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/30 to-transparent sm:bg-linear-to-r sm:via-bg/10" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:w-[34rem] md:p-10">
          <Badge tone="accent">Featured · {cat.label}</Badge>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-fg md:text-4xl">
            {featured.name}
          </h2>
          <p className="mt-2 text-sm text-muted md:text-base">
            {featured.role} in {featured.city}. {featured.lookingFor}.
          </p>
        </div>
      </Link>

      <section className="rise rise-3">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl tracking-tight md:text-2xl">
            Crafts
          </h2>
        </div>
        <div className="hide-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-7">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/talent"
              search={{ craft: c.id }}
              className="group relative h-28 w-40 shrink-0 snap-start overflow-hidden rounded-xl sm:h-32 sm:w-auto"
            >
              <Portrait
                src={c.cover}
                alt=""
                className="transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-bg/45 transition-colors duration-200 group-hover:bg-bg/30" />
              <span className="absolute inset-x-0 bottom-0 p-3 font-medium text-fg">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl tracking-tight md:text-2xl">
            For you
          </h2>
          <Link
            to="/talent"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
          >
            All talent
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {forYou.map((t) => (
            <TalentCard key={t.id} talent={t} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl tracking-tight md:text-2xl">
            Open rooms
          </h2>
          <Link
            to="/gigs"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
          >
            All gigs
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="hide-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {openGigs.map((g) => (
            <GigCard key={g.id} gig={g} fluid />
          ))}
        </div>
      </section>
    </div>
  );
}
