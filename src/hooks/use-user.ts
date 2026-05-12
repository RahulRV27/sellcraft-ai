"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";
import { createClient } from "@/lib/supabase/client";

export function useUser() {
  const { user, plan, usage, setUser } = useUserStore();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email ?? "",
          name: authUser.user_metadata?.name ?? null,
        });
      }
    });
  }, [setUser]);

  return { user, plan, usage };
}
