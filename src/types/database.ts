import type { Plan, PlatformId } from "@/lib/constants";

export type SubscriptionStatus = "active" | "cancelled" | "past_due";

export type EventType =
  | "listing_generated"
  | "listing_scored"
  | "keyword_search"
  | "competitor_analysis";

export interface User {
  id: string;
  email: string;
  phone: string | null;
  name: string | null;
  plan: Plan;
  plan_expires_at: string | null;
  listings_used_this_month: number;
  scores_used_this_month: number;
  referral_code: string | null;
  referred_by: string | null;
  created_at: string;
}

export interface Listing {
  id: string;
  user_id: string;
  platform: PlatformId;
  category: string | null;
  product_name: string | null;
  input_data: Record<string, unknown> | null;
  generated_listing: GeneratedListing | null;
  quality_score: number | null;
  score_breakdown: Record<string, number> | null;
  version: number;
  parent_listing_id: string | null;
  created_at: string;
}

export interface GeneratedListing {
  title: string;
  bullet_points: string[];
  description: string;
  search_keywords: string[];
  backend_keywords: string[];
}

export interface Keyword {
  id: string;
  platform: PlatformId;
  category: string | null;
  keyword: string;
  hinglish_variants: string[] | null;
  estimated_volume: string | null;
  source: string | null;
  seasonal: boolean;
  festival: string | null;
  updated_at: string;
}

export interface PlatformRule {
  id: string;
  platform: PlatformId;
  category: string | null;
  rules: Record<string, unknown> | null;
  best_practices: Record<string, unknown> | null;
  updated_at: string;
}

export interface CategoryBenchmark {
  id: string;
  platform: PlatformId;
  category: string | null;
  avg_score: number | null;
  top_10_avg_score: number | null;
  common_title_patterns: string[] | null;
  common_keywords: string[] | null;
  sample_listings: Record<string, unknown> | null;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  razorpay_subscription_id: string | null;
  plan: string;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
}

export interface UsageEvent {
  id: string;
  user_id: string;
  event_type: EventType;
  platform: string | null;
  category: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}
