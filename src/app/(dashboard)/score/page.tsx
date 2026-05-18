"use client";

import { useState } from "react";
import { BarChart3, Target, TrendingUp, AlertTriangle, CheckCircle2, Loader2, Lightbulb, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/page-header";
import { PlatformSelector } from "@/components/shared/platform-selector";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { CATEGORIES, type PlatformId, type Category } from "@/lib/constants";

interface ScoreResult {
  total_score: number;
  breakdown: {
    title: number;
    bullets: number;
    description: number;
    keywords: number;
    compliance: number;
    positioning: number;
  };
  improvements: string[];
}

const criteriaConfig = [
  { key: "title" as const, name: "Title Quality", max: 20, icon: Target },
  { key: "bullets" as const, name: "Bullet Points", max: 20, icon: CheckCircle2 },
  { key: "description" as const, name: "Description", max: 20, icon: TrendingUp },
  { key: "keywords" as const, name: "Keyword Usage", max: 20, icon: BarChart3 },
  { key: "compliance" as const, name: "Compliance", max: 10, icon: AlertTriangle },
  { key: "positioning" as const, name: "Positioning", max: 10, icon: Shield },
];

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600 border-green-500";
  if (score >= 50) return "text-yellow-600 border-yellow-500";
  return "text-red-600 border-red-500";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Needs Work";
}

function getBarColor(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.8) return "bg-green-500";
  if (pct >= 0.5) return "bg-yellow-500";
  return "bg-red-500";
}

export default function ScorePage() {
  const [platform, setPlatform] = useState<PlatformId | null>(null);
  const [category, setCategory] = useState<Category | "">("");
  const [title, setTitle] = useState("");
  const [bullets, setBullets] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ScoreResult | null>(null);

  const canScore = platform && category && title.trim() && bullets.trim() && description.trim();

  async function handleScore() {
    if (!canScore) return;
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, category, title, bullets, description }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setResult(data.score);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

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
                  <Label htmlFor="title" className="text-sm sm:text-base font-medium text-muted-foreground">Listing Title</Label>
                  <Input
                    id="title"
                    placeholder="Paste your listing title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="min-h-[40px] sm:min-h-[46px] text-sm sm:text-base bg-muted/30 border-border px-3 sm:px-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bullets" className="text-sm sm:text-base font-medium text-muted-foreground">
                    {platform === "flipkart" ? "Highlights" : "Bullet Points"}
                  </Label>
                  <Textarea
                    id="bullets"
                    placeholder="Paste your bullet points or highlights, one per line..."
                    value={bullets}
                    onChange={(e) => setBullets(e.target.value)}
                    rows={5}
                    className="text-sm sm:text-base bg-muted/30 border-border px-3 sm:px-4 py-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm sm:text-base font-medium text-muted-foreground">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Paste your product description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="text-sm sm:text-base bg-muted/30 border-border px-3 sm:px-4 py-3"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleScore}
                  disabled={!canScore || loading}
                  className="w-full min-h-[44px] sm:min-h-[48px] text-sm sm:text-base shadow-soft-sm hover:shadow-soft-md"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scoring listing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Score My Listing
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <FadeIn delay={0.1}>
            <Card className="bg-card shadow-soft-md rounded-2xl border-0">
              <CardContent className="pt-5 pb-4 sm:pt-7 sm:pb-5">
                <div className="flex flex-col items-center text-center">
                  <div className={`h-20 w-20 sm:h-28 sm:w-28 rounded-full border-4 flex items-center justify-center mb-3 sm:mb-4 transition-colors ${result ? getScoreColor(result.total_score) : "border-border"}`}>
                    <span className={`text-2xl sm:text-4xl font-bold ${result ? getScoreColor(result.total_score).split(" ")[0] : "text-muted-foreground"}`}>
                      {result ? result.total_score : "--"}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-medium">
                    {result ? getScoreLabel(result.total_score) : "Overall Score"}
                  </p>
                  <p className="text-xs sm:text-base text-muted-foreground mt-1">
                    {result ? `${result.total_score} out of 100` : "Submit a listing to see your score"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="bg-card shadow-soft-md rounded-2xl border-0">
              <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
                <CardTitle className="text-sm sm:text-base">
                  {result ? "Score Breakdown" : "Scoring Criteria"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                {criteriaConfig.map((c) => {
                  const score = result?.breakdown[c.key] ?? null;
                  return (
                    <div key={c.key} className="space-y-1.5">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <c.icon className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 ${score !== null ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm sm:text-base font-medium">{c.name}</p>
                            {score !== null && (
                              <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                                {score}/{c.max}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {score !== null ? (
                        <div className="ml-7 sm:ml-9 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getBarColor(score, c.max)}`}
                            style={{ width: `${(score / c.max) * 100}%` }}
                          />
                        </div>
                      ) : (
                        <p className="ml-7 sm:ml-9 text-xs sm:text-sm text-muted-foreground">
                          {c.key === "title" ? "Keywords, length, readability" :
                           c.key === "bullets" ? "Feature-benefit structure" :
                           c.key === "description" ? "Depth, formatting, SEO" :
                           c.key === "keywords" ? "Coverage and placement" :
                           c.key === "compliance" ? "Platform rule adherence" :
                           "Competitive differentiation"}
                        </p>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </FadeIn>

          {result && result.improvements.length > 0 && (
            <FadeIn delay={0.3}>
              <Card className="bg-card shadow-soft-md rounded-2xl border-0">
                <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
                  <CardTitle className="text-sm sm:text-base">Improvements</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <StaggerContainer className="space-y-2.5 sm:space-y-3">
                    {result.improvements.map((tip, i) => (
                      <StaggerItem key={i}>
                        <div className="flex gap-2.5 sm:gap-3 items-start">
                          <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 shrink-0 mt-0.5" />
                          <p className="text-sm sm:text-base text-muted-foreground">{tip}</p>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </CardContent>
              </Card>
            </FadeIn>
          )}
        </div>
      </div>
    </>
  );
}
