import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Portrait } from "@/components/portrait";
import { Sheet } from "@/components/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label, Textarea } from "@/components/ui/input";
import { categoryOf, gigById } from "@/data/catalog";
import { useHub } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gigs/$id")({ component: GigDetail });

function GigDetail() {
  const { id } = Route.useParams();
  const room = gigById(id);
  const saved = useHub((s) => s.savedGigs.includes(id));
  const toggle = useHub((s) => s.toggleGig);
  const apply = useHub((s) => s.apply);
  const applied = useHub((s) => s.applications.some((a) => a.gigId === id));
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  if (!room) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-2xl">That room has closed.</p>
        <Link to="/gigs" className="mt-4 inline-block text-sm text-muted">
          Back to gigs
        </Link>
      </div>
    );
  }

  const cat = categoryOf(room.category);

  function submit() {
    if (!room || !note.trim()) return;
    apply(room.id, note.trim());
    setOpen(false);
    setNote("");
    toast("Application sent. It lives in your studio.");
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="overflow-hidden rounded-2xl">
        <div className="relative aspect-video">
          <Portrait src={room.cover} alt="" priority />
          <div className="absolute left-3 top-3">
            <Badge tone="accent">{cat.label}</Badge>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted">{room.company}</p>
        <h1 className="font-display mt-1 text-3xl tracking-tight">{room.title}</h1>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-3.5" strokeWidth={1.7} />
          {room.city} · {room.locationType}
        </p>
      </div>

      <dl className="grid grid-cols-3 gap-2 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <div>
          <dt className="text-xs tracking-wide text-muted">Pay</dt>
          <dd className="mt-1 text-sm font-medium">{room.rate}</dd>
        </div>
        <div>
          <dt className="text-xs tracking-wide text-muted">Posted</dt>
          <dd className="mt-1 text-sm font-medium">{room.posted}</dd>
        </div>
        <div>
          <dt className="text-xs tracking-wide text-muted">Closes</dt>
          <dd className="mt-1 text-sm font-medium">{room.deadline}</dd>
        </div>
      </dl>

      <p className="leading-relaxed text-fg/90">{room.description}</p>

      <section>
        <h2 className="font-display text-xl tracking-tight">What they need</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {room.requirements.map((r) => (
            <li
              key={r}
              className="rounded-lg bg-surface px-3.5 py-3 text-sm leading-relaxed shadow-[var(--shadow-border)]"
            >
              {r}
            </li>
          ))}
        </ul>
      </section>

      <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 bg-bg/90 py-3 backdrop-blur-sm">
        <Button variant="outline" onClick={() => toggle(room.id)}>
          <Bookmark className={cn("size-4", saved && "fill-fg")} />
          {saved ? "Saved" : "Save"}
        </Button>
        <Button onClick={() => (applied ? null : setOpen(true))} disabled={applied}>
          {applied ? "Applied" : "Apply"}
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen} title="Apply">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted">
            A short note for {room.company}. Keep it specific — dates, a reel, why
            this room.
          </p>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cover">Note</Label>
            <Textarea
              id="cover"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="I can be in the booth those three days. Reel attached in my studio."
            />
          </div>
          <Button className="mt-2 w-full" onClick={submit} disabled={!note.trim()}>
            Send application
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
