"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Wand2,
  BarChart3,
  Sparkles,
  Search,
  Users,
  TrendingUp,
  FileText,
  Zap,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StaggerContainer, StaggerItem, FadeIn, HoverLift } from "@/components/shared/motion";
import { useUser } from "@/hooks/use-user";
import { PLAN_LIMITS, PLATFORMS, type PlatformId } from "@/lib/constants";

interface RecentListing {
  id: string;
  platform: PlatformId;
  category: string | null;
  product_name: string | null;
  quality_score: number | null;
  created_at: string;
}

const quickActions = [
  {
    title: "Generate Listing",
    description: "Create a marketplace-ready listing from product details using AI",
    href: "/generate",
    icon: Wand2,
    gradient: "from-amber-100 to-yellow-100",
  },
  {
    title: "Score Listing",
    description: "Get a 0-100 quality score with actionable improvement tips",
    href: "/score",
    icon: BarChart3,
    gradient: "from-emerald-100 to-teal-100",
  },
  {
    title: "Optimize Listing",
    description: "Transform a weak listing into a high-converting one instantly",
    href: "/optimize",
    icon: Sparkles,
    gradient: "from-amber-100 to-orange-100",
  },
];

const tools = [
  {
    title: "Keyword Research",
    description: "Discover high-volume keywords including Hinglish terms",
    href: "/keywords",
    icon: Search,
  },
  {
    title: "Competitor Analysis",
    description: "Analyze competitor listings and find gaps to exploit",
    href: "/competitors",
    icon: Users,
  },
];

function getPlatformName(platformId: PlatformId): string {
  return PLATFORMS.find((p) => p.id === platformId)?.shortName ?? platformId;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function DashboardPage() {
  const { plan, usage } = useUser();
  const [listings, setListings] = useState<RecentListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await fetch("/api/listings?limit=5");
        if (res.ok) {
          const data = await res.json();
          setListings(data.listings ?? []);
        }
      } catch {
        // silently fail — stats will still show from user store
      } finally {
        setLoadingListings(false);
      }
    }
    fetchListings();
  }, []);

  const listingLimit = PLAN_LIMITS[plan].listings;
  const creditsRemaining = listingLimit === Infinity
    ? "Unlimited"
    : String(Math.max(0, listingLimit - usage.listings));

  const scoredListings = listings.filter((l) => l.quality_score !== null);
  const avgScore = scoredListings.length > 0
    ? Math.round(scoredListings.reduce((sum, l) => sum + l.quality_score!, 0) / scoredListings.length)
    : null;

  const stats = [
    { label: "Listings This Month", value: String(usage.listings), icon: FileText },
    { label: "Avg. Quality Score", value: avgScore !== null ? String(avgScore) : "--", icon: TrendingUp },
    { label: "Total Listings", value: loadingListings ? "..." : String(listings.length), icon: Search },
    { label: "Credits Remaining", value: creditsRemaining, icon: Zap },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome to SellCraft AI. Your seller intelligence command center."
      />

      <StaggerContainer className="grid gap-3 sm:gap-5 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="bg-card shadow-soft-md rounded-2xl border-0">
              <CardContent className="pt-4 pb-3 sm:pt-6 sm:pb-5">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <p className="text-xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs sm:text-base text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {(loadingListings || listings.length > 0) && (
        <FadeIn>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-5">Recent Listings</h2>
          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            {loadingListings ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="bg-card shadow-soft-sm rounded-xl border-0">
                  <CardContent className="flex items-center gap-3 sm:gap-4 py-3 px-4 sm:py-4 sm:px-5">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-muted animate-pulse shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : listings.map((listing) => (
              <Link key={listing.id} href={`/listings/${listing.id}`} className="block group">
                <Card className="bg-card shadow-soft-sm rounded-xl border-0 transition-all duration-200 hover:shadow-soft-md">
                  <CardContent className="flex items-center gap-3 sm:gap-4 py-3 px-4 sm:py-4 sm:px-5">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-medium truncate">
                        {listing.product_name || "Untitled Listing"}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {getPlatformName(listing.platform)}
                        {listing.category ? ` · ${listing.category}` : ""}
                        {" · "}
                        {formatDate(listing.created_at)}
                      </p>
                    </div>
                    {listing.quality_score !== null && (
                      <div className="text-right shrink-0">
                        <p className="text-sm sm:text-base font-bold text-primary">{listing.quality_score}</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    )}
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

        </FadeIn>
      )}

      <FadeIn>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-5">Quick Actions</h2>
      </FadeIn>
      <StaggerContainer className="grid gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
        {quickActions.map((action) => (
          <StaggerItem key={action.href}>
            <HoverLift>
              <Link href={action.href} className="group block">
                <Card className="bg-card shadow-soft-md rounded-2xl border-0 transition-all duration-300 hover:shadow-soft-lg cursor-pointer h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                      {action.title}
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-1">{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-5">Research Tools</h2>
      </FadeIn>
      <StaggerContainer className="grid gap-3 sm:gap-5 sm:grid-cols-2">
        {tools.map((tool) => (
          <StaggerItem key={tool.href}>
            <HoverLift>
              <Link href={tool.href} className="group block">
                <Card className="bg-card shadow-soft-md rounded-2xl border-0 transition-all duration-300 hover:shadow-soft-lg cursor-pointer">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-5">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <tool.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base sm:text-lg">{tool.title}</CardTitle>
                        <CardDescription className="text-sm sm:text-base mt-1">{tool.description}</CardDescription>
                      </div>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </>
  );
}
