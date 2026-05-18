import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@/lib/supabase/server";
import { assembleListingPrompt } from "@/lib/ai/prompts";
import { PLATFORMS, CATEGORIES, PLAN_LIMITS } from "@/lib/constants";
import type { PlatformId, Category, Plan } from "@/lib/constants";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { platform, category, productName, features } = body;

  if (!platform || !category || !productName || !features) {
    return NextResponse.json(
      { error: "Missing required fields: platform, category, productName, features" },
      { status: 400 }
    );
  }

  if (!PLATFORMS.some((p) => p.id === platform)) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }

  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const { data: dbUser } = await supabase
    .from("users")
    .select("plan, listings_used_this_month")
    .eq("id", user.id)
    .single();

  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const plan = dbUser.plan as Plan;
  const limit = PLAN_LIMITS[plan].listings;
  if (limit !== Infinity && dbUser.listings_used_this_month >= limit) {
    return NextResponse.json(
      { error: `Monthly listing limit reached (${limit}). Upgrade your plan for more.` },
      { status: 429 }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service not configured" },
      { status: 500 }
    );
  }

  const { system, user: userPrompt } = assembleListingPrompt(
    platform as PlatformId,
    category as Category,
    productName,
    features
  );

  const groq = new Groq({ apiKey });

  let response;
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: system },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });
    response = completion.choices[0]?.message?.content || "";
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "AI service error";
    return NextResponse.json(
      { error: `AI service error: ${errorMessage}` },
      { status: 502 }
    );
  }

  let generatedListing;
  try {
    const cleaned = response
      .replace(/^```json\s*/, "")
      .replace(/```\s*$/, "")
      .trim();
    generatedListing = JSON.parse(cleaned);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI response" },
      { status: 500 }
    );
  }

  const { data: listing, error: insertError } = await supabase
    .from("listings")
    .insert({
      user_id: user.id,
      platform,
      category,
      product_name: productName,
      input_data: { productName, features },
      generated_listing: generatedListing,
    })
    .select("id")
    .single();

  if (insertError) {
    return NextResponse.json(
      { error: "Failed to save listing" },
      { status: 500 }
    );
  }

  await supabase
    .from("users")
    .update({ listings_used_this_month: dbUser.listings_used_this_month + 1 })
    .eq("id", user.id);

  return NextResponse.json({
    id: listing.id,
    listing: generatedListing,
  });
}
