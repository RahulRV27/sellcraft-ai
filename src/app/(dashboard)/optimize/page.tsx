"use client";

import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn } from "@/components/shared/motion";

export default function OptimizePage() {
  return (
    <>
      <PageHeader
        title="One-Click Optimizer"
        description="Paste your existing listing and get an optimized version with before/after comparison."
      />

      <FadeIn>
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5 mb-8">
          <TrendingUp className="h-6 w-6 text-primary shrink-0" />
          <p className="text-base">
            <span className="font-medium text-primary">Average improvement:</span>{" "}
            <span className="text-muted-foreground">Sellers see their score jump from ~34 to ~78 with a single optimization.</span>
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn>
          <Card className="bg-card shadow-soft-md rounded-2xl border-0">
            <CardHeader className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                  <span className="text-base font-bold text-red-500">B</span>
                </div>
                <div>
                  <CardTitle className="text-lg">Before</CardTitle>
                  <CardDescription className="text-base mt-0.5">Paste your current listing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 px-6 pb-6">
              <div className="space-y-2.5">
                <label className="text-base font-medium text-muted-foreground">Platform</label>
                <div className="h-12 rounded-xl border border-border bg-muted/30 px-4 flex items-center text-base text-muted-foreground">
                  Select platform...
                </div>
              </div>
              <div className="space-y-2.5">
                <label className="text-base font-medium text-muted-foreground">Your Current Listing</label>
                <div className="min-h-[220px] rounded-xl border border-border bg-muted/30 p-4 text-base text-muted-foreground">
                  Paste your full listing here (title, bullets, description)...
                </div>
              </div>
              <div className="h-12 w-full rounded-xl bg-primary/20 flex items-center justify-center gap-2 text-base font-medium text-primary/50 cursor-not-allowed">
                <Sparkles className="h-5 w-5" />
                Optimize Now
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card className="bg-card shadow-soft-md rounded-2xl border-0 relative">
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden lg:flex h-12 w-12 rounded-full border border-border bg-card shadow-soft-sm items-center justify-center z-10">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <CardHeader className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <span className="text-base font-bold text-emerald-500">A</span>
                </div>
                <div>
                  <CardTitle className="text-lg">After</CardTitle>
                  <CardDescription className="text-base mt-0.5">AI-optimized version</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="min-h-[310px] rounded-xl border border-dashed border-border bg-muted/20 p-8 flex flex-col items-center justify-center text-center">
                <Sparkles className="h-10 w-10 text-muted-foreground/40 mb-4" />
                <p className="text-base text-muted-foreground">Your optimized listing will appear here</p>
                <p className="text-base text-muted-foreground/70 mt-2">with highlighted improvements and score comparison</p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </>
  );
}
