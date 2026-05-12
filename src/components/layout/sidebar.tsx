"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wand2,
  BarChart3,
  Sparkles,
  Search,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Separator } from "@/components/ui/separator";
import { UsageIndicator } from "@/components/shared/usage-indicator";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generate", label: "Generate Listing", icon: Wand2 },
  { href: "/score", label: "Score Listing", icon: BarChart3 },
  { href: "/optimize", label: "Optimize", icon: Sparkles },
  { href: "/keywords", label: "Keywords", icon: Search },
  { href: "/competitors", label: "Competitors", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 border-r border-border bg-sidebar shadow-soft-sm">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex h-16 items-center px-6">
          <Logo />
        </div>
        <Separator />
        <nav className="flex-1 space-y-1.5 px-4 py-5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3.5 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 min-h-[44px]",
                  isActive
                    ? "border-l-[3px] border-primary bg-primary/8 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border px-4 py-5">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3.5 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 min-h-[44px] mb-5",
              pathname === "/settings"
                ? "border-l-[3px] border-primary bg-primary/8 text-primary font-semibold"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <Settings className={cn("h-5 w-5 shrink-0", pathname === "/settings" && "text-primary")} />
            Settings
          </Link>
          <div className="rounded-xl border border-border bg-card shadow-soft-sm p-4">
            <UsageIndicator />
          </div>
        </div>
      </div>
    </aside>
  );
}
