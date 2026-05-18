"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";
import { createClient } from "@/lib/supabase/client";
import type { Plan } from "@/lib/constants";

export function useUser() {
  const { user, plan, usage, setUser, setPlan, setUsage } = useUserStore();

  useEffect(() => {
    const supabase = createClient();

    async function fetchUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        setUser(null);
        return;
      }

      setUser({
        id: authUser.id,
        email: authUser.email ?? "",
        name: authUser.user_metadata?.name ?? null,
      });

      const { data: dbUser } = await supabase
        .from("users")
        .select("plan, listings_used_this_month, scores_used_this_month")
        .eq("id", authUser.id)
        .single();

      if (dbUser) {
        setPlan(dbUser.plan as Plan);
        setUsage({
          listings: dbUser.listings_used_this_month,
          scores: dbUser.scores_used_this_month,
        });
      }
    }

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          fetchUser();
        } else {
          setUser(null);
          setPlan("free");
          setUsage({ listings: 0, scores: 0 });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser, setPlan, setUsage]);

  return { user, plan, usage };
}
