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

      <StaggerContainer className="grid gap-5 sm:grid-cols-3 mb-8">
        {steps.map((s) => (
          <StaggerItem key={s.step}>
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card/80 shadow-soft-sm p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-base font-bold shrink-0">
                {s.step}
              </div>
              <div>
                <p className="text-base font-medium">{s.title}</p>
                <p className="text-base text-muted-foreground mt-1">{s.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn>
        <Card className="bg-card shadow-soft-md rounded-2xl border-0">
          <CardHeader className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                <Wand2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Product Details</CardTitle>
                <CardDescription className="text-base mt-0.5">Fill in your product information to generate an optimized listing</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-7 px-6 pb-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2.5">
                <label className="text-base font-medium text-muted-foreground">Platform</label>
                <div className="h-12 rounded-xl border border-border bg-muted/30 px-4 flex items-center text-base text-muted-foreground">
                  Select platform...
                </div>
              </div>
              <div className="space-y-2.5">
                <label className="text-base font-medium text-muted-foreground">Category</label>
                <div className="h-12 rounded-xl border border-border bg-muted/30 px-4 flex items-center text-base text-muted-foreground">
                  Select category...
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              <label className="text-base font-medium text-muted-foreground">Product Name</label>
              <div className="h-12 rounded-xl border border-border bg-muted/30 px-4 flex items-center text-base text-muted-foreground">
                e.g. Premium Stainless Steel Water Bottle 1L
              </div>
            </div>
            <div className="space-y-2.5">
              <label className="text-base font-medium text-muted-foreground">Key Features &amp; Details</label>
              <div className="min-h-[140px] rounded-xl border border-border bg-muted/30 p-4 text-base text-muted-foreground">
                Describe key features, materials, sizes, USPs...
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-base font-medium">Ready to generate?</p>
                  <p className="text-base text-muted-foreground">Connect Supabase &amp; Claude API to enable generation</p>
                </div>
              </div>
              <div className="h-12 px-8 rounded-xl bg-primary/20 flex items-center text-base font-medium text-primary/50 cursor-not-allowed">
                Generate
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </>
  );
}
