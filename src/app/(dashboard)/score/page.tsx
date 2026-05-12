"use client";

import { BarChart3, Target, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn } from "@/components/shared/motion";

const criteria = [
  { name: "Title Quality", description: "Keywords, length, readability", icon: Target },
  { name: "Bullet Points", description: "Feature-benefit structure", icon: CheckCircle2 },
  { name: "Description", description: "Depth, formatting, SEO", icon: TrendingUp },
  { name: "Keyword Usage", description: "Coverage and placement", icon: BarChart3 },
  { name: "Compliance", description: "Platform rule adherence", icon: AlertTriangle },
];

export default function ScorePage() {
  return (
    <>
      <PageHeader
        title="Listing Quality Scorer"
        description="Paste your listing and get a quality score from 0 to 100 with specific improvements."
      />

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FadeIn>
            <Card className="bg-card shadow-soft-md rounded-2xl border-0">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">Your Listing</CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-0.5">Paste your existing listing content below</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-5 px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-medium text-muted-foreground">Platform</label>
                  <div className="h-10 sm:h-12 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center text-sm sm:text-base text-muted-foreground">
                    Select platform...
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-medium text-muted-foreground">Listing Title</label>
                  <div className="h-10 sm:h-12 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center text-sm sm:text-base text-muted-foreground">
                    Paste your listing title...
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-medium text-muted-foreground">Bullet Points / Highlights</label>
                  <div className="min-h-[100px] sm:min-h-[120px] rounded-xl border border-border bg-muted/30 p-3 sm:p-4 text-sm sm:text-base text-muted-foreground">
                    Paste bullet points...
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-medium text-muted-foreground">Description</label>
                  <div className="min-h-[100px] sm:min-h-[120px] rounded-xl border border-border bg-muted/30 p-3 sm:p-4 text-sm sm:text-base text-muted-foreground">
                    Paste description...
                  </div>
                </div>
                <div className="h-10 sm:h-12 w-full rounded-xl bg-primary/20 flex items-center justify-center text-sm sm:text-base font-medium text-primary/50 cursor-not-allowed">
                  Score My Listing
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <FadeIn delay={0.1}>
            <Card className="bg-card shadow-soft-md rounded-2xl border-0">
              <CardContent className="pt-5 pb-4 sm:pt-7 sm:pb-5">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-4 border-border flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-4xl font-bold text-muted-foreground">--</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium">Overall Score</p>
                  <p className="text-xs sm:text-base text-muted-foreground mt-1">Submit a listing to see your score</p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="bg-card shadow-soft-md rounded-2xl border-0">
              <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
                <CardTitle className="text-sm sm:text-base">Scoring Criteria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                {criteria.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 sm:gap-4">
                    <c.icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm sm:text-base font-medium">{c.name}</p>
                      <p className="text-xs sm:text-base text-muted-foreground">{c.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
