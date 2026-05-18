"use client";

import { useUserStore } from "@/stores/user-store";
import { PLAN_LIMITS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export function UsageIndicator() {
  const { plan, usage } = useUserStore();
  const limits = PLAN_LIMITS[plan];
  const listingLimit =
    limits.listings === Infinity ? "Unlimited" : limits.listings;
  const scoreLimit =
    limits.scores === Infinity ? "Unlimited" : limits.scores;

  return (
    <div className="space-y-3 text-base">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Plan</span>
        <Badge variant="secondary" className="capitalize text-base">
          {plan}
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Listings</span>
        <span className="font-medium">
          {usage.listings}/{listingLimit}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Scores</span>
        <span className="font-medium">
          {usage.scores}/{scoreLimit}
        </span>
      </div>
    </div>
  );
}
