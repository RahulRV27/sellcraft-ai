"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Wand2,
  BarChart3,
  Sparkles,
  Search,
  Users,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import { SlideUp, FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/shared/motion";

const features = [
  {
    icon: Wand2,
    title: "AI Listing Generator",
    description:
      "Input product details, get a marketplace-ready listing optimized for your specific platform and category.",
  },
  {
    icon: BarChart3,
    title: "Quality Scorer",
    description:
      "Get a 0-100 quality score with specific improvements. Know exactly where your listing stands.",
  },
  {
    icon: Sparkles,
    title: "One-Click Optimizer",
    description:
      "Paste your existing listing, get an optimized version. Watch your score jump from 34 to 78.",
  },
  {
    icon: Search,
    title: "Keyword Intelligence",
    description:
      "Ranked keywords including Hinglish variations and seasonal trends that Indian buyers actually search.",
  },
  {
    icon: Users,
    title: "Competitor Analysis",
    description:
      "See what competitors do well, find gaps to exploit, and outrank them with data-driven insights.",
  },
  {
    icon: Shield,
    title: "Platform Compliance",
    description:
      "Auto-check for Amazon and Flipkart formatting rules, character limits, and content policies.",
  },
];

const stats = [
  { value: "10s", label: "Average generation time" },
  { value: "40%+", label: "Listing quality improvement" },
  { value: "10+", label: "Product categories" },
  { value: "2", label: "Platforms supported" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-sm shadow-soft-sm border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3 font-bold text-xl">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span>SellCraft</span>
            <span className="text-muted-foreground font-normal text-base">
              AI
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-sm sm:text-base"
              )}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className={cn(buttonVariants({ size: "sm" }), "text-sm sm:text-base px-4 sm:px-6 shadow-soft-sm hover:shadow-soft-md")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:py-32 text-center">
          <SlideUp>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-base text-primary mb-8">
              <Sparkles className="h-4 w-4" />
              India&apos;s First Seller Intelligence Platform
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-7xl mb-6 sm:mb-8">
              Your listings are
              <br />
              <span className="text-gradient-pastel">leaving money</span> on the table.
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 leading-relaxed">
              SellCraft AI reverse-engineers what sells on Amazon India and
              Flipkart — then generates listings that are algorithmically
              optimized for your platform, category, and buyer persona.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-8">
              <Link
                href="/generate"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "shadow-soft-md hover:shadow-soft-lg text-base sm:text-lg px-6 sm:px-10 h-11 sm:h-12"
                )}
              >
                Try Free — No Signup
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/score"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "text-base sm:text-lg px-6 sm:px-10 h-11 sm:h-12"
                )}
              >
                Score My Listing
              </Link>
            </div>
            <p className="text-base text-muted-foreground">
              No credit card required. First listing generated in under 60
              seconds.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-16">
          <StaggerContainer className="grid grid-cols-2 gap-6 sm:gap-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-gradient-pastel">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 sm:mb-5">
                Everything you need to
                <span className="text-gradient-pastel"> sell smarter</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Not generic AI writing — data-driven marketplace intelligence
                built specifically for Indian e-commerce.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <HoverLift>
                  <div className="group bg-card shadow-soft-md rounded-2xl p-5 sm:p-8 transition-all duration-300 hover:shadow-soft-lg h-full">
                    <div className="mb-3 sm:mb-5 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Platforms */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 sm:mb-5">
              Platform-specific, <span className="text-gradient-pastel">not generic</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 sm:mb-14">
              A listing optimized for &ldquo;marketplaces&rdquo; is optimized for
              none. Every output is tuned to a specific platform&apos;s algorithm,
              format, and buyer behavior.
            </p>
          </FadeIn>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <HoverLift>
              <div className="flex-1 max-w-sm mx-auto bg-card shadow-soft-md rounded-2xl p-6 sm:p-10 transition-all hover:shadow-soft-lg">
                <Globe className="h-10 w-10 text-primary mx-auto mb-5" />
                <h3 className="font-semibold text-xl mb-3">Amazon India</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  200-char title formulas, 5-bullet optimization, backend keyword
                  strategy, A9 algorithm alignment.
                </p>
              </div>
            </HoverLift>
            <HoverLift>
              <div className="flex-1 max-w-sm mx-auto bg-card shadow-soft-md rounded-2xl p-6 sm:p-10 transition-all hover:shadow-soft-lg">
                <Globe className="h-10 w-10 text-primary mx-auto mb-5" />
                <h3 className="font-semibold text-xl mb-3">Flipkart</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Concise attribute-rich titles, 7-highlight format, Flipkart
                  search optimization, regional keyword targeting.
                </p>
              </div>
            </HoverLift>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 sm:mb-5">
              Ready to <span className="text-gradient-pastel">craft listings that sell</span>?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto mb-8">
              Join thousands of Indian sellers who are already using AI to
              outperform their competition.
            </p>
            <Link
              href="/generate"
              className={cn(
                buttonVariants({ size: "lg" }),
                "shadow-soft-md hover:shadow-soft-lg text-base sm:text-lg px-6 sm:px-10 h-11 sm:h-12"
              )}
            >
              Generate Your First Listing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-base text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-medium">SellCraft AI</span>
          </div>
          <p>India&apos;s first AI-powered Seller Intelligence Platform</p>
        </div>
      </footer>
    </div>
  );
}
