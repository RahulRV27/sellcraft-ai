import { create } from "zustand";
import type { Plan } from "@/lib/constants";

interface UserState {
  user: { id: string; email: string; name: string | null } | null;
  plan: Plan;
  usage: { listings: number; scores: number };
  setUser: (user: UserState["user"]) => void;
  setPlan: (plan: Plan) => void;
  setUsage: (usage: Partial<UserState["usage"]>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  plan: "free",
  usage: { listings: 0, scores: 0 },
  setUser: (user) => set({ user }),
  setPlan: (plan) => set({ plan }),
  setUsage: (usage) =>
    set((state) => ({ usage: { ...state.usage, ...usage } })),
}));
