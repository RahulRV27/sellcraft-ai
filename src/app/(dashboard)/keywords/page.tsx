"use client";

import { Search, TrendingUp, Globe, Hash, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/shared/motion";

const keywordTypes = [
  { name: "Primary Keywords", description: "High-volume main search terms", icon: Search, count: "--" },
  { name: "Long-tail Keywords", description: "Specific multi-word phrases", icon: TrendingUp, count: "--" },
  { name: "Hinglish Terms", description: "Hindi-English mixed terms Indian buyers use", icon: Globe, count: "--" },
  { name: "Seasonal Keywords", description: "Festival and event-based terms", icon: Calendar, count: "--" },
];

export default function KeywordsPage() {
  return (
    <>
      <PageHeader
        title="Keyword Research"
        description="Discover high-volume keywords including Hinglish variations that Indian buyers actually search for."
      />

      <StaggerContainer className="grid gap-3 sm:gap-5 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
        {keywordTypes.map((type) => (
          <StaggerItem key={type.name}>
            <Card className="bg-card shadow-soft-md rounded-2xl border-0">
              <CardContent className="pt-4 pb-3 sm:pt-6 sm:pb-5">
                <type.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary mb-2 sm:mb-3" />
                <p className="text-xl sm:text-3xl font-bold">{type.count}</p>
                <p className="text-xs sm:text-base font-medium mt-1">{type.name}</p>
                <p className="text-xs sm:text-base text-muted-foreground mt-0.5 sm:mt-1">{type.description}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn>
        <Card className="bg-card shadow-soft-md rounded-2xl border-0">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">Search Keywords</CardTitle>
                <CardDescription className="text-sm sm:text-base mt-0.5">Enter a product name or category to discover relevant keywords</CardDescription>
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
                <label className="text-sm sm:text-base font-medium text-muted-foreground">Category</label>
                <div className="h-10 sm:h-12 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center text-sm sm:text-base text-muted-foreground">
                  Select category...
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm sm:text-base font-medium text-muted-foreground">Product / Search Term</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="h-10 sm:h-12 flex-1 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center text-sm sm:text-base text-muted-foreground">
                  e.g. stainless steel water bottle
                </div>
                <div className="h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-primary/20 flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-primary/50 cursor-not-allowed shrink-0">
                  <Hash className="h-4 w-4 sm:h-5 sm:w-5" />
                  Find Keywords
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6 sm:p-10 text-center">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/40 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-muted-foreground">Keywords will appear here</p>
              <p className="text-xs sm:text-base text-muted-foreground/70 mt-1.5 sm:mt-2">Ranked by estimated search volume with Hinglish variations</p>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </>
  );
}
