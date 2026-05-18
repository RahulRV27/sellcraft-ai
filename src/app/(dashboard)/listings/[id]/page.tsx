"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Copy, Check, ShoppingBag, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn } from "@/components/shared/motion";
import { PLATFORMS, type PlatformId } from "@/lib/constants";

interface ListingDetail {
  id: string;
  platform: PlatformId;
  category: string | null;
  product_name: string | null;
  generated_listing: {
    title: string;
    bullet_points?: string[];
    highlights?: string[];
    description: string;
    search_keywords: string[];
    backend_keywords?: string[];
  } | null;
  quality_score: number | null;
  created_at: string;
}

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

function getPlatformName(platformId: PlatformId): string {
  return PLATFORMS.find((p) => p.id === platformId)?.name ?? platformId;
}

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        if (!res.ok) {
          setError(res.status === 404 ? "Listing not found." : "Failed to load listing.");
          return;
        }
        const data = await res.json();
        setListing(data.listing);
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <>
        <PageHeader title="Listing Details" description="" />
        <Card className="bg-card shadow-soft-md rounded-2xl border-0">
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">{error || "Listing not found."}</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }

  const gen = listing.generated_listing;
  const bulletPoints = gen?.bullet_points || gen?.highlights || [];
  const bulletLabel = listing.platform === "flipkart" ? "Highlights" : "Bullet Points";

  function getFullListingText() {
    if (!gen) return "";
    const parts = [
      `Title:\n${gen.title}`,
      `\n${bulletLabel}:\n${bulletPoints.map((b, i) => `${i + 1}. ${b}`).join("\n")}`,
      `\nDescription:\n${gen.description}`,
      `\nSearch Keywords:\n${gen.search_keywords.join(", ")}`,
    ];
    if (gen.backend_keywords?.length) {
      parts.push(`\nBackend Keywords:\n${gen.backend_keywords.join(", ")}`);
    }
    return parts.join("\n");
  }

  const createdDate = new Date(listing.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <PageHeader
          title={listing.product_name || "Listing Details"}
          description={`${getPlatformName(listing.platform)}${listing.category ? ` · ${listing.category}` : ""} · ${createdDate}`}
        />
      </div>

      {listing.quality_score !== null && (
        <FadeIn>
          <Card className="bg-card shadow-soft-md rounded-2xl border-0 mb-4 sm:mb-6">
            <CardContent className="flex items-center gap-4 py-4 px-5">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                <span className="text-lg font-bold text-green-700">{listing.quality_score}</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Quality Score</p>
                <p className="text-xs text-muted-foreground">
                  {listing.quality_score >= 80 ? "Excellent" : listing.quality_score >= 60 ? "Good" : "Needs improvement"}
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {gen ? (
        <FadeIn>
          <Card className="bg-card shadow-soft-md rounded-2xl border-0">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">Generated Listing</CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-0.5">
                      {getPlatformName(listing.platform)} listing
                    </CardDescription>
                  </div>
                </div>
                <CopyButton text={getFullListingText()} label="full listing" />
              </div>
            </CardHeader>
            <CardContent className="space-y-5 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold">Title</h3>
                  <CopyButton text={gen.title} label="title" />
                </div>
                <p className="text-sm sm:text-base bg-muted/30 rounded-xl p-3 sm:p-4 border border-border">
                  {gen.title}
                </p>
              </div>

              {bulletPoints.length > 0 && (
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
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold">Description</h3>
                  <CopyButton text={gen.description} label="description" />
                </div>
                <div className="text-sm sm:text-base bg-muted/30 rounded-xl p-3 sm:p-4 border border-border whitespace-pre-wrap">
                  {gen.description}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold">Search Keywords</h3>
                  <CopyButton text={gen.search_keywords.join(", ")} label="search keywords" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {gen.search_keywords.map((kw, i) => (
                    <span key={i} className="text-xs sm:text-sm bg-primary/10 text-primary rounded-full px-3 py-1">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {gen.backend_keywords && gen.backend_keywords.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-semibold">Backend Keywords</h3>
                    <CopyButton text={gen.backend_keywords.join(", ")} label="backend keywords" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {gen.backend_keywords.map((kw, i) => (
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
      ) : (
        <Card className="bg-card shadow-soft-md rounded-2xl border-0">
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No generated content available for this listing.</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
