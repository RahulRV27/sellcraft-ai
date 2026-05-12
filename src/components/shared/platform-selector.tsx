"use client";

import { PLATFORMS, type PlatformId } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PlatformSelectorProps {
  value: PlatformId | null;
  onChange: (platform: PlatformId) => void;
}

export function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {PLATFORMS.map((platform) => (
        <button
          key={platform.id}
          type="button"
          onClick={() => onChange(platform.id)}
          className={cn(
            "flex items-center justify-center rounded-xl border-2 p-5 text-base font-medium transition-all duration-200 min-h-[44px]",
            value === platform.id
              ? "border-primary bg-primary/8 text-primary shadow-soft-sm"
              : "border-border bg-card hover:border-primary/40 shadow-soft-sm hover:shadow-soft-md"
          )}
        >
          {platform.name}
        </button>
      ))}
    </div>
  );
}
