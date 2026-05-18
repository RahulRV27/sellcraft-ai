"use client";

import { useState } from "react";
import { Wand2, ShoppingBag, FileText, Sparkles, Loader2, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/page-header";
import { PlatformSelector } from "@/components/shared/platform-selector";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/shared/motion";
import { CATEGORIES, type PlatformId, type Category } from "@/lib/constants";

interface GeneratedListing {
  title: string;
  bullet_points?: string[];
  highlights?: string[];
  description: string;
  search_keywords: string[];
  backend_keywords?: string[];
}

const steps = [
  { step: 1, title: "Select Platform", description: "Choose Amazon India or Flipkart", icon: ShoppingBag },
  { step: 2, title: "Enter Details", description: "Product name, features, and category", icon: FileText },
  { step: 3, title: "Generate", description: "AI creates your optimized listing", icon: Sparkles },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      title={`Copy ${label}`}
    >
      {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function GeneratePage() {
  const [platform, setPlatform] = useState<PlatformId | null>(null);
  const [category, setCategory] = useState<Category | "">("");
  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedListing | null>(null);

  const canGenerate = platform && category && productName.trim() && features.trim();

  async function handleGenerate() {
    if (!canGenerate) return;
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, category, productName, features }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setResult(data.listing);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const bulletPoints = result?.bullet_points || result?.highlights || [];
  const bulletLabel = platform === "flipkart" ? "Highlights" : "Bullet Points";

  function getFullListingText() {
    if (!result) return "";
    const parts = [
      `Title:\n${result.title}`,
      `\n${bulletLabel}:\n${bulletPoints.map((b, i) => `${i + 1}. ${b}`).join("\n")}`,
      `\nDescription:\n${result.description}`,
      `\nSearch Keywords:\n${result.search_keywords.join(", ")}`,
    ];
    if (result.backend_keywords?.length) {
      parts.push(`\nBackend Keywords:\n${result.backend_keywords.join(", ")}`);
    }
    return parts.join("\n");
  }

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
            <div className="space-y-2">
              <Label className="text-sm sm:text-base font-medium text-muted-foreground">Platform</Label>
              <PlatformSelector value={platform} onChange={setPlatform} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm sm:text-base font-medium text-muted-foreground">Category</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="h-10 sm:h-12 w-full rounded-xl border border-border bg-muted/30 px-3 sm:px-4 text-sm sm:text-base text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
              >
                <option value="" disabled>Select category...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productName" className="text-sm sm:text-base font-medium text-muted-foreground">Product Name</Label>
              <Input
                id="productName"
                placeholder="e.g. Premium Stainless Steel Water Bottle 1L"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="min-h-[40px] sm:min-h-[46px] text-sm sm:text-base bg-muted/30 border-border px-3 sm:px-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features" className="text-sm sm:text-base font-medium text-muted-foreground">Key Features & Details</Label>
              <Textarea
                id="features"
                placeholder="Describe key features, materials, sizes, USPs, target audience..."
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                rows={4}
                className="text-sm sm:text-base bg-muted/30 border-border px-3 sm:px-4 py-3"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={!canGenerate || loading}
              className="w-full min-h-[44px] sm:min-h-[48px] text-sm sm:text-base shadow-soft-sm hover:shadow-soft-md"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating listing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Listing
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </FadeIn>

      {result && (
        <FadeIn>
          <Card className="bg-card shadow-soft-md rounded-2xl border-0 mt-6 sm:mt-8">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">Generated Listing</CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-0.5">Your optimized listing is ready</CardDescription>
                  </div>
                </div>
                <CopyButton text={getFullListingText()} label="full listing" />
              </div>
            </CardHeader>
            <CardContent className="space-y-5 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold">Title</h3>
                  <CopyButton text={result.title} label="title" />
                </div>
                <p className="text-sm sm:text-base bg-muted/30 rounded-xl p-3 sm:p-4 border border-border">
                  {result.title}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold">{bulletLabel}</h3>
                  <CopyButton text={bulletPoints.join("\n")} label={bulletLabel.toLowerCase()} />
                </div>
                <ul className="space-y-2">
                  {bulletPoints.map((point, i) => (
                    <li key={i} className="text-sm sm:text-base bg-muted/30 rounded-xl p-3 sm:p-4 border border-border">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold">Description</h3>
                  <CopyButton text={result.description} label="description" />
                </div>
                <div className="text-sm sm:text-base bg-muted/30 rounded-xl p-3 sm:p-4 border border-border whitespace-pre-wrap">
                  {result.description}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold">Search Keywords</h3>
                  <CopyButton text={result.search_keywords.join(", ")} label="search keywords" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.search_keywords.map((kw, i) => (
                    <span key={i} className="text-xs sm:text-sm bg-primary/10 text-primary rounded-full px-3 py-1">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {result.backend_keywords && result.backend_keywords.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-semibold">Backend Keywords</h3>
                    <CopyButton text={result.backend_keywords.join(", ")} label="backend keywords" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.backend_keywords.map((kw, i) => (
                      <span key={i} className="text-xs sm:text-sm bg-muted rounded-full px-3 py-1 border border-border">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      )}
    </>
  );
}
