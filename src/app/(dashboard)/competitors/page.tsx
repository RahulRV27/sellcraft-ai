"use client";

import { Users, Link2, BarChart3, Search, Swords, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/shared/motion";

const analysisAreas = [
  { name: "Listing Score", description: "Quality score comparison", icon: BarChart3 },
  { name: "Keyword Gap", description: "Keywords they rank for that you miss", icon: Search },
  { name: "Strengths", description: "What they do well", icon: Target },
  { name: "Weaknesses", description: "Gaps you can exploit", icon: Swords },
];

export default function CompetitorsPage() {
  return (
    <>
      <PageHeader
        title="Competitor Analysis"
        description="Analyze competitor listings to find gaps and opportunities you can exploit."
      />

      <StaggerContainer className="grid gap-3 sm:gap-5 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
        {analysisAreas.map((area) => (
          <StaggerItem key={area.name}>
            <div className="flex items-center gap-3 sm:gap-4 rounded-xl border border-border bg-card/80 shadow-soft-sm p-3 sm:p-5">
              <area.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
              <div>
                <p className="text-sm sm:text-base font-medium">{area.name}</p>
                <p className="text-xs sm:text-base text-muted-foreground">{area.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn>
        <Card className="bg-card shadow-soft-md rounded-2xl border-0">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">Competitor Listing</CardTitle>
                <CardDescription className="text-sm sm:text-base mt-0.5">Paste a competitor&apos;s listing to analyze their strategy</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-5 px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-medium text-muted-foreground">Platform</label>
                <div className="h-10 sm:h-12 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center text-sm sm:text-base text-muted-foreground">
                  Select platform...
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-medium text-muted-foreground">Listing URL (optional)</label>
                <div className="h-10 sm:h-12 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                  <Link2 className="h-5 w-5 shrink-0" />
                  Paste product URL...
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm sm:text-base font-medium text-muted-foreground">Competitor Listing Content</label>
              <div className="min-h-[130px] sm:min-h-[170px] rounded-xl border border-border bg-muted/30 p-3 sm:p-4 text-sm sm:text-base text-muted-foreground">
                Paste the competitor&apos;s full listing (title, bullets, description)...
              </div>
            </div>
            <div className="h-10 sm:h-12 w-full rounded-xl bg-primary/20 flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-primary/50 cursor-not-allowed">
              <Swords className="h-4 w-4 sm:h-5 sm:w-5" />
              Analyze Competitor
            </div>

            <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6 sm:p-10 text-center">
              <Users className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/40 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-muted-foreground">Analysis results will appear here</p>
              <p className="text-xs sm:text-base text-muted-foreground/70 mt-1.5 sm:mt-2">Including score breakdown, keyword gaps, and actionable recommendations</p>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </>
  );
}
