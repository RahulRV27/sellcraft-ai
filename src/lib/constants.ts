export const PLATFORMS = [
  { id: "amazon_in", name: "Amazon India", shortName: "Amazon" },
  { id: "flipkart", name: "Flipkart", shortName: "Flipkart" },
] as const;

export type PlatformId = (typeof PLATFORMS)[number]["id"];

export const CATEGORIES = [
  "Fashion & Apparel",
  "Electronics & Accessories",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Health & Wellness",
  "Baby Products",
  "Sports & Fitness",
  "Books & Stationery",
  "Grocery & Gourmet",
  "Toys & Games",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PLAN_LIMITS = {
  free: { listings: 5, scores: 10, platforms: 1, competitors: 0, bulk: false },
  pro: { listings: 50, scores: Infinity, platforms: 2, competitors: 5, bulk: false },
  business: { listings: 200, scores: Infinity, platforms: Infinity, competitors: 30, bulk: true },
  enterprise: { listings: Infinity, scores: Infinity, platforms: Infinity, competitors: Infinity, bulk: true },
  agency: { listings: Infinity, scores: Infinity, platforms: Infinity, competitors: Infinity, bulk: true },
} as const;

export type Plan = keyof typeof PLAN_LIMITS;
