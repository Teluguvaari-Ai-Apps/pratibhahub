import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Portrait } from "@/components/portrait";
import { Sheet } from "@/components/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { TalentCard } from "@/components/talent-card";
import { categoryOf, talentById, TALENTS } from "@/data/catalog";
import { useHub } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/talent/$id")({
  component: TalentProfile,
});

function TalentProfile() {
  const { id } = Route.useParams();
  const person = talentById(id);
  const saved = useHub((s) => s.savedTalent.includes(id));
  const toggle = useHub((s) => s.toggleTalent);
  const sendBrief = useHub((s) => s.sendBrief);
  const briefed = useHub((s) => s.briefs.some((b) => b.talentId === id));
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("");
  const [note, setNote] = useState("");

  if (!person) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-2xl">That profile has left the room.</p>
        <Link to="/talent" className="mt-4 inline-block text-sm text-muted">
          Back to talent
        </Link>
      </div>
    );
  }

  const cat = categoryOf(person.category);
  const related = TALENTS.filter(
    (t) => t.category === person.category && t.id !== person.id,
  ).slice(0, 4);

  function submitBrief() {
    if (!person || !project.trim() || !note.trim()) return;
    sendBrief(person.id, project.trim(), note.trim());
    setOpen(false);
    setProject("");
    setNote("");
    toast("Brief sent. They will see it in their studio.");
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="overflow-hidden rounded-2xl">
        <div className="relative aspect-3/4">
          <Portrait src={person.photo} alt={person.name} priority />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-bg to-transparent" />
        </div>
      </div>

      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge>{cat.label}</Badge>
            <h1 className="font-display mt-2 text-3xl tracking-tight">
              {person.name}
            </h1>
            <p className="mt-1 text-muted">
              {person.role} · @{person.handle}
            </p>
          </div>
          {person.available ? (
            <Badge tone="live">Open</Badge>
          ) : (
            <Badge>Booked</Badge>
          )}
        </div>

        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-3.5" strokeWidth={1.7} />
          {person.city}, {person.country}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => toggle(person.id)}
            className="w-full"
          >
            <Bookmark className={cn("size-4", saved && "fill-fg")} />
            {saved ? "Saved" : "Save"}
          </Button>
          <Button
            className="w-full"
            onClick={() => setOpen(true)}
            disabled={!person.available}
          >
            {briefed ? "Send another brief" : "Hire"}
          </Button>
        </div>
      </div>

      <p className="text-base leading-relaxed text-fg/90">{person.bio}</p>

      <dl className="grid grid-cols-3 gap-2 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <div>
          <dt className="text-xs tracking-wide text-muted">Rate</dt>
          <dd className="mt-1 text-sm font-medium">{person.rate}</dd>
        </div>
        <div>
          <dt className="text-xs tracking-wide text-muted">Years</dt>
          <dd className="mt-1 text-sm font-medium tabular-nums">{person.years}</dd>
        </div>
        <div>
          <dt className="text-xs tracking-wide text-muted">Rating</dt>
          <dd className="mt-1 text-sm font-medium tabular-nums">
            {person.rating} · {person.reviewCount}
          </dd>
        </div>
      </dl>

      <section>
        <h2 className="font-display text-xl tracking-tight">Skills</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {person.skills.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          Languages: {person.languages.join(", ")}
        </p>
        <p className="mt-1 text-sm text-muted">Looking for: {person.lookingFor}</p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight">Selected work</h2>
        <ul className="mt-3 divide-y divide-border">
          {person.credits.map((c) => (
            <li
              key={c.title}
              className="flex items-baseline justify-between gap-4 py-3"
            >
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-sm text-muted">{c.note}</p>
              </div>
              <span className="text-sm tabular-nums text-subtle">{c.year}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight">Notes from rooms</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {person.reviews.map((r) => (
            <li
              key={r.name}
              className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
            >
              <p className="text-base leading-relaxed">“{r.quote}”</p>
              <p className="mt-2 text-sm text-muted">
                {r.name} · {r.role}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-xl tracking-tight">Same floor</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {related.map((t) => (
              <TalentCard key={t.id} talent={t} />
            ))}
          </div>
        </section>
      )}

      <Sheet open={open} onOpenChange={setOpen} title={`Brief ${person.name}`}>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted">
            A short note on the work. This stays in your studio — they will see
            it as an inquiry.
          </p>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="project">Project</Label>
            <Input
              id="project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="e.g. Session vocals, March EP"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What is the room, the dates, the feel."
            />
          </div>
          <Button
            className="mt-2 w-full"
            onClick={submitBrief}
            disabled={!project.trim() || !note.trim()}
          >
            Send brief
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
