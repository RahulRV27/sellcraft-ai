"use client";

import { Wand2, ShoppingBag, FileText, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/shared/motion";

const steps = [
  { step: 1, title: "Select Platform", description: "Choose Amazon India or Flipkart", icon: ShoppingBag },
  { step: 2, title: "Enter Details", description: "Product name, features, and category", icon: FileText },
  { step: 3, title: "Generate", description: "AI creates your optimized listing", icon: Sparkles },
];

export default function GeneratePage() {
  return (
    <>
      <PageHeader
        title="AI Listing Generator"
        description="Enter your product details and get a marketplace-ready listing in seconds."
      />

      <StaggerContainer className="grid gap-3 sm:gap-5 sm:grid-cols-3 mb-6 sm:mb-8">
        {steps.map((s) => (
          <StaggerItem key={s.step}>
            <div className="flex items-start gap-3 sm:gap-4 rounded-xl border border-border bg-card/80 shadow-soft-sm p-3 sm:p-5">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm sm:text-base font-bold shrink-0">
                {s.step}
              </div>
              <div>
                <p className="text-sm sm:text-base font-medium">{s.title}</p>
                <p className="text-xs sm:text-base text-muted-foreground mt-0.5 sm:mt-1">{s.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn>
        <Card className="bg-card shadow-soft-md rounded-2xl border-0">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                <Wand2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">Product Details</CardTitle>
                <CardDescription className="text-sm sm:text-base mt-0.5">Fill in your product information to generate an optimized listing</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 sm:space-y-7 px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
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
              <label className="text-sm sm:text-base font-medium text-muted-foreground">Product Name</label>
              <div className="h-10 sm:h-12 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center text-sm sm:text-base text-muted-foreground">
                e.g. Premium Stainless Steel Water Bottle 1L
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm sm:text-base font-medium text-muted-foreground">Key Features &amp; Details</label>
              <div className="min-h-[120px] sm:min-h-[140px] rounded-xl border border-border bg-muted/30 p-3 sm:p-4 text-sm sm:text-base text-muted-foreground">
                Describe key features, materials, sizes, USPs...
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:p-5">
              <div className="flex items-center gap-3 sm:gap-4">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
                <div>
                  <p className="text-sm sm:text-base font-medium">Ready to generate?</p>
                  <p className="text-xs sm:text-base text-muted-foreground">Connect Supabase &amp; Claude API to enable generation</p>
                </div>
              </div>
              <div className="h-10 sm:h-12 px-6 sm:px-8 rounded-xl bg-primary/20 flex items-center text-sm sm:text-base font-medium text-primary/50 cursor-not-allowed w-full sm:w-auto justify-center">
                Generate
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </>
  );
}
