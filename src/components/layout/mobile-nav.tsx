"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  LayoutDashboard,
  Wand2,
  BarChart3,
  Sparkles,
  Search,
  Users,
  Settings,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  { href: "/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-xl text-base font-medium hover:bg-accent transition-colors min-h-[44px] min-w-[48px]">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar border-border">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex flex-col h-full">
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
                  onClick={() => setOpen(false)}
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
            <div className="rounded-xl border border-border bg-card shadow-soft-sm p-4">
              <UsageIndicator />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
