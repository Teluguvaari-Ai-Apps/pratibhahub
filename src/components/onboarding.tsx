import { useState } from "react";
import { CATEGORIES, type CategoryId } from "@/data/catalog";
import { useHub } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { PhoneFrame } from "@/components/phone-frame";
import { Mark } from "@/components/wordmark";
import { cn } from "@/lib/utils";

export function Onboarding() {
  const complete = useHub((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<CategoryId[]>([]);

  function toggle(id: CategoryId) {
    setPicked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  if (step === 0) {
    return (
      <PhoneFrame>
        <div className="flex min-h-0 flex-1 flex-col px-6 pt-6 pb-8 text-fg">
          <Mark className="size-10 rise" />
          <h1 className="font-display rise rise-2 mt-8 text-4xl leading-tight tracking-tight">
            A room for people who make things.
          </h1>
          <p className="rise rise-3 mt-4 text-base leading-relaxed text-muted">
            PratibaHub is where singers, directors, artists, dancers, designers,
            and software people keep a living portfolio — and find the next
            room to walk into.
          </p>
          <div className="rise rise-4 mt-auto pt-8">
            <Button className="w-full" size="lg" onClick={() => setStep(1)}>
              Continue
            </Button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex min-h-0 flex-1 flex-col px-6 pt-4 pb-8 text-fg">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Your crafts
        </p>
        <h1 className="font-display mt-3 text-3xl tracking-tight">
          What do you walk in as?
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Pick as many as you like. This shapes who we put in front of you —
          you can change it later.
        </p>
        <ul className="mt-6 min-h-0 flex-1 space-y-2 overflow-y-auto">
          {CATEGORIES.map((c) => {
            const on = picked.includes(c.id);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => toggle(c.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left shadow-[var(--shadow-border)] transition-[background-color,box-shadow] duration-150 ease-out",
                    on
                      ? "bg-raised shadow-[var(--shadow-border-hover)]"
                      : "bg-surface",
                  )}
                >
                  <span>
                    <span className="block font-medium text-fg">{c.label}</span>
                    <span className="block text-sm text-muted">{c.blurb}</span>
                  </span>
                  <span
                    className={cn(
                      "size-4 shrink-0 rounded-full shadow-[var(--shadow-border)]",
                      on && "bg-accent",
                    )}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-2 pt-4">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => complete(picked.length ? picked : ["screen"])}
          >
            Skip
          </Button>
          <Button
            className="flex-[2]"
            size="lg"
            disabled={picked.length === 0}
            onClick={() => complete(picked)}
          >
            Enter the room
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function Splash() {
  return (
    <PhoneFrame>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-fg">
        <Mark className="size-11" />
        <p className="font-display mt-5 text-2xl tracking-tight">PratibaHub</p>
      </div>
    </PhoneFrame>
  );
}
