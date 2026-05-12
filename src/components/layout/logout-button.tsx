"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogout}
      title="Sign out"
      className="h-9 w-9 text-muted-foreground hover:text-foreground"
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
}
