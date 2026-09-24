import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { GigRow } from "@/components/gig-card";
import { Sheet } from "@/components/sheet";
import { TalentRow } from "@/components/talent-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { CATEGORIES, gigById, talentById, type CategoryId } from "@/data/catalog";
import { useHub, type StudioProfile } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio")({ component: Studio });

type Tab = "profile" | "saved" | "activity";

function Studio() {
  const [tab, setTab] = useState<Tab>("profile");
  const profile = useHub((s) => s.profile);
  const crafts = useHub((s) => s.crafts);
  const setCrafts = useHub((s) => s.setCrafts);
  const savedTalent = useHub((s) => s.savedTalent);
  const savedGigs = useHub((s) => s.savedGigs);
  const applications = useHub((s) => s.applications);
  const briefs = useHub((s) => s.briefs);
  const setProfile = useHub((s) => s.setProfile);
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState<StudioProfile>(profile);

  const talents = savedTalent.map(talentById).filter(Boolean);
  const gigs = savedGigs.map(gigById).filter(Boolean);

  function saveProfile() {
    setProfile(draft);
    setEdit(false);
    toast("Studio updated.");
  }

  function toggleCraft(id: CategoryId) {
    setCrafts(
      crafts.includes(id) ? crafts.filter((c) => c !== id) : [...crafts, id],
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Your room
        </p>
        <h1 className="font-display mt-1 text-3xl tracking-tight">Studio</h1>
      </header>

      <div className="grid grid-cols-3 rounded-xl bg-surface p-1 shadow-[var(--shadow-border)]">
        {(
          [
            ["profile", "Profile"],
            ["saved", "Saved"],
            ["activity", "Activity"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "h-10 rounded-lg text-sm font-medium transition-colors duration-150",
              tab === id ? "bg-raised text-fg" : "text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <div className="flex size-16 items-center justify-center rounded-xl bg-raised font-display text-2xl text-fg">
              {(profile.name || "You").slice(0, 1).toUpperCase()}
            </div>
            <h2 className="font-display mt-4 text-2xl tracking-tight">
              {profile.name || "Your name"}
            </h2>
            <p className="text-sm text-muted">
              {profile.role || "Your craft"}
              {profile.city ? ` · ${profile.city}` : ""}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {profile.bio ||
                "Add a short bio so rooms know how you walk in."}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setDraft(profile);
                setEdit(true);
              }}
            >
              Edit profile
            </Button>
          </div>

          <section>
            <h2 className="font-display text-xl tracking-tight">Crafts</h2>
            <p className="mt-1 text-sm text-muted">
              Shapes Discover. Tap to add or drop.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const on = crafts.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCraft(c.id)}
                    className={cn(
                      "h-9 rounded-full px-3.5 text-sm font-medium transition-colors duration-150",
                      on ? "bg-accent text-accent-fg" : "bg-raised text-muted",
                    )}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {tab === "saved" && (
        <div className="flex flex-col gap-6">
          <section>
            <h2 className="font-display text-xl tracking-tight">Talent</h2>
            {talents.length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                No one saved yet. Bookmark people from their profile.
              </p>
            ) : (
              <ul className="mt-2">
                {talents.map((t) =>
                  t ? (
                    <li key={t.id}>
                      <TalentRow talent={t} />
                    </li>
                  ) : null,
                )}
              </ul>
            )}
          </section>
          <section>
            <h2 className="font-display text-xl tracking-tight">Gigs</h2>
            {gigs.length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                No rooms saved. Keep a gig while you write the note.
              </p>
            ) : (
              <div className="mt-3 flex flex-col gap-3">
                {gigs.map((g) => (g ? <GigRow key={g.id} gig={g} /> : null))}
              </div>
            )}
          </section>
        </div>
      )}

      {tab === "activity" && (
        <div className="flex flex-col gap-6">
          <section>
            <h2 className="font-display text-xl tracking-tight">Applications</h2>
            {applications.length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                You have not applied yet. Open Gigs and walk in.
              </p>
            ) : (
              <ul className="mt-3 flex flex-col gap-3">
                {applications.map((a) => {
                  const gig = gigById(a.gigId);
                  if (!gig) return null;
                  return (
                    <li
                      key={a.gigId}
                      className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to="/gigs/$id"
                            params={{ id: gig.id }}
                            className="font-medium text-fg"
                          >
                            {gig.title}
                          </Link>
                          <p className="text-sm text-muted">{gig.company}</p>
                        </div>
                        <Badge tone="live">Sent</Badge>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {a.note}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
          <section>
            <h2 className="font-display text-xl tracking-tight">Briefs sent</h2>
            {briefs.length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                Hire someone from their profile to leave a brief here.
              </p>
            ) : (
              <ul className="mt-3 flex flex-col gap-3">
                {briefs.map((b) => {
                  const talent = talentById(b.talentId);
                  if (!talent) return null;
                  return (
                    <li
                      key={`${b.talentId}-${b.at}`}
                      className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to="/talent/$id"
                            params={{ id: talent.id }}
                            className="font-medium text-fg"
                          >
                            {talent.name}
                          </Link>
                          <p className="text-sm text-muted">{b.project}</p>
                        </div>
                        <Badge>Brief</Badge>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {b.note}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      )}

      <Sheet open={edit} onOpenChange={setEdit} title="Edit studio">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="role">Craft</Label>
            <Input
              id="role"
              value={draft.role}
              onChange={(e) => setDraft({ ...draft, role: e.target.value })}
              placeholder="Director, singer, engineer…"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={draft.city}
              onChange={(e) => setDraft({ ...draft, city: e.target.value })}
              placeholder="Mumbai, Berlin, Lagos…"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={draft.bio}
              onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              placeholder="A few lines on how you work."
            />
          </div>
          <Button className="mt-2 w-full" onClick={saveProfile}>
            Save
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
