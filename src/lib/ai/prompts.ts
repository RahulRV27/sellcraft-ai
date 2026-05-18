import fs from "fs";
import path from "path";
import type { PlatformId, Category } from "@/lib/constants";

const PROMPTS_DIR = path.join(process.cwd(), "prompts");

function readTemplate(relativePath: string): string {
  return fs.readFileSync(path.join(PROMPTS_DIR, relativePath), "utf-8");
}

const PLATFORM_FILES: Record<PlatformId, string> = {
  amazon_in: "platforms/amazon_india.txt",
  flipkart: "platforms/flipkart.txt",
};

const INDIAN_COMMERCE_CONTEXT = `Indian E-Commerce Context:
- Always mention COD (Cash on Delivery) availability in descriptions - it's a major purchase driver in India
- Include Hinglish keyword variations where relevant (e.g., "pani ki bottle", "steel bottle for office")
- Reference Indian festivals and seasons when applicable (Diwali, Holi, monsoon, summer)
- Indian trust signals matter: "100% genuine product", "easy returns", "manufacturer warranty"
- Price-conscious buyers: emphasize value, combo deals, and savings
- Mobile-first: 80%+ of Indian e-commerce traffic is mobile - keep titles and bullets scannable
- Regional appeal: mention suitability for Indian weather, food, lifestyle where relevant
- Metric units only (kg, cm, ml, L) - no imperial measurements`;

export function assembleScorerPrompt(
  platform: PlatformId,
  category: Category,
  title: string,
  bullets: string,
  description: string
): { system: string; user: string } {
  const baseTemplate = readTemplate("base/listing_scorer.txt");
  const platformContext = readTemplate(PLATFORM_FILES[platform]);

  const categoryContext = `Category: ${category}\nEvaluate the listing against "${category}" category standards. Consider category-specific conventions for title structure, keyword usage, and buyer expectations.`;

  const listingContent = `Title:\n${title}\n\nBullet Points / Highlights:\n${bullets}\n\nDescription:\n${description}`;

  const assembled = baseTemplate
    .replace("{{PLATFORM_CONTEXT}}", platformContext)
    .replace("{{CATEGORY_CONTEXT}}", categoryContext)
    .replace("{{LISTING_CONTENT}}", listingContent);

  return {
    system:
      "You are SellCraft AI's listing quality evaluator for Indian e-commerce platforms. You always respond with valid JSON only - no markdown, no code fences, no extra text.",
    user: assembled,
  };
}

export function assembleListingPrompt(
  platform: PlatformId,
  category: Category,
  productName: string,
  features: string
): { system: string; user: string } {
  const baseTemplate = readTemplate("base/listing_generator.txt");
  const platformContext = readTemplate(PLATFORM_FILES[platform]);

  const categoryContext = `Category: ${category}\nOptimize the listing for the "${category}" category. Use category-specific terminology, highlight features that matter most to buyers in this category, and follow category conventions for title structure and keyword selection.`;

  const productDetails = `Product Name: ${productName}\n\nKey Features & Details:\n${features}`;

  const assembled = baseTemplate
    .replace("{{PLATFORM_CONTEXT}}", platformContext)
    .replace("{{CATEGORY_CONTEXT}}", categoryContext)
    .replace("{{INDIAN_COMMERCE_CONTEXT}}", INDIAN_COMMERCE_CONTEXT)
    .replace("{{PRODUCT_DETAILS}}", productDetails);

  return {
    system:
      "You are SellCraft AI, an expert marketplace listing generator for Indian e-commerce platforms. You always respond with valid JSON only - no markdown, no code fences, no extra text.",
    user: assembled,
  };
}
