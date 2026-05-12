"use client";

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
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StaggerContainer, StaggerItem, FadeIn, HoverLift } from "@/components/shared/motion";

const stats = [
  { label: "Listings Generated", value: "0", icon: FileText },
  { label: "Avg. Quality Score", value: "--", icon: TrendingUp },
  { label: "Keywords Found", value: "0", icon: Search },
  { label: "Credits Remaining", value: "10", icon: Zap },
];

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

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome to SellCraft AI. Your seller intelligence command center."
      />

      <StaggerContainer className="grid gap-5 grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="bg-card shadow-soft-md rounded-2xl border-0">
              <CardContent className="pt-6 pb-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-base text-muted-foreground mt-1.5">{stat.label}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn>
        <h2 className="text-xl font-semibold mb-5">Quick Actions</h2>
      </FadeIn>
      <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {quickActions.map((action) => (
          <StaggerItem key={action.href}>
            <HoverLift>
              <Link href={action.href} className="group block">
                <Card className="bg-card shadow-soft-md rounded-2xl border-0 transition-all duration-300 hover:shadow-soft-lg cursor-pointer h-full">
                  <CardHeader className="p-6">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {action.title}
                      <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </CardTitle>
                    <CardDescription className="text-base mt-1">{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn>
        <h2 className="text-xl font-semibold mb-5">Research Tools</h2>
      </FadeIn>
      <StaggerContainer className="grid gap-5 sm:grid-cols-2">
        {tools.map((tool) => (
          <StaggerItem key={tool.href}>
            <HoverLift>
              <Link href={tool.href} className="group block">
                <Card className="bg-card shadow-soft-md rounded-2xl border-0 transition-all duration-300 hover:shadow-soft-lg cursor-pointer">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription className="text-base mt-1">{tool.description}</CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
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
