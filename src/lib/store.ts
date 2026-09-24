import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CategoryId } from "@/data/catalog";

export type StudioProfile = {
  name: string;
  role: string;
  city: string;
  bio: string;
};

export type Application = {
  gigId: string;
  note: string;
  at: number;
};

export type Brief = {
  talentId: string;
  project: string;
  note: string;
  at: number;
};

type HubState = {
  hydrated: boolean;
  onboarded: boolean;
  crafts: CategoryId[];
  savedTalent: string[];
  savedGigs: string[];
  applications: Application[];
  briefs: Brief[];
  profile: StudioProfile;
  setHydrated: () => void;
  completeOnboarding: (crafts: CategoryId[]) => void;
  setCrafts: (crafts: CategoryId[]) => void;
  toggleTalent: (id: string) => void;
  toggleGig: (id: string) => void;
  apply: (gigId: string, note: string) => void;
  sendBrief: (talentId: string, project: string, note: string) => void;
  setProfile: (profile: StudioProfile) => void;
  hasApplied: (gigId: string) => boolean;
  hasBriefed: (talentId: string) => boolean;
};

const emptyProfile: StudioProfile = {
  name: "",
  role: "",
  city: "",
  bio: "",
};

export const useHub = create<HubState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      onboarded: false,
      crafts: [],
      savedTalent: [],
      savedGigs: [],
      applications: [],
      briefs: [],
      profile: emptyProfile,
      setHydrated: () => set({ hydrated: true }),
      completeOnboarding: (crafts) => set({ onboarded: true, crafts }),
      setCrafts: (crafts) => set({ crafts }),
      toggleTalent: (id) =>
        set((s) => ({
          savedTalent: s.savedTalent.includes(id)
            ? s.savedTalent.filter((x) => x !== id)
            : [id, ...s.savedTalent],
        })),
      toggleGig: (id) =>
        set((s) => ({
          savedGigs: s.savedGigs.includes(id)
            ? s.savedGigs.filter((x) => x !== id)
            : [id, ...s.savedGigs],
        })),
      apply: (gigId, note) =>
        set((s) => ({
          applications: s.applications.some((a) => a.gigId === gigId)
            ? s.applications
            : [{ gigId, note, at: Date.now() }, ...s.applications],
        })),
      sendBrief: (talentId, project, note) =>
        set((s) => ({
          briefs: [{ talentId, project, note, at: Date.now() }, ...s.briefs],
        })),
      setProfile: (profile) => set({ profile }),
      hasApplied: (gigId) => get().applications.some((a) => a.gigId === gigId),
      hasBriefed: (talentId) => get().briefs.some((b) => b.talentId === talentId),
    }),
    {
      name: "pratibahub-v1",
      skipHydration: true,
      partialize: (s) => ({
        onboarded: s.onboarded,
        crafts: s.crafts,
        savedTalent: s.savedTalent,
        savedGigs: s.savedGigs,
        applications: s.applications,
        briefs: s.briefs,
        profile: s.profile,
      }),
    },
  ),
);
