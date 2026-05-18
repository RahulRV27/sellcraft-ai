import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@/lib/supabase/server";
import { assembleScorerPrompt } from "@/lib/ai/prompts";
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

  const { platform, category, title, bullets, description } = body;

  if (!platform || !category || !title || !bullets || !description) {
    return NextResponse.json(
      { error: "Missing required fields: platform, category, title, bullets, description" },
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
    .select("plan, scores_used_this_month")
    .eq("id", user.id)
    .single();

  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const plan = dbUser.plan as Plan;
  const limit = PLAN_LIMITS[plan].scores;
  if (limit !== Infinity && dbUser.scores_used_this_month >= limit) {
    return NextResponse.json(
      { error: `Monthly score limit reached (${limit}). Upgrade your plan for more.` },
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

  const { system, user: userPrompt } = assembleScorerPrompt(
    platform as PlatformId,
    category as Category,
    title,
    bullets,
    description
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
      temperature: 0.3,
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

  let scoreResult;
  try {
    const cleaned = response
      .replace(/^```json\s*/, "")
      .replace(/```\s*$/, "")
      .trim();
    scoreResult = JSON.parse(cleaned);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI response" },
      { status: 500 }
    );
  }

  if (
    typeof scoreResult.total_score !== "number" ||
    !scoreResult.breakdown ||
    !Array.isArray(scoreResult.improvements)
  ) {
    return NextResponse.json(
      { error: "Invalid score response format" },
      { status: 500 }
    );
  }

  const { data: listing, error: insertError } = await supabase
    .from("listings")
    .insert({
      user_id: user.id,
      platform,
      category,
      product_name: title,
      input_data: { title, bullets, description },
      quality_score: scoreResult.total_score,
      score_breakdown: {
        ...scoreResult.breakdown,
        improvements: scoreResult.improvements,
      },
    })
    .select("id")
    .single();

  if (insertError) {
    return NextResponse.json(
      { error: "Failed to save score" },
      { status: 500 }
    );
  }

  await supabase
    .from("users")
    .update({ scores_used_this_month: dbUser.scores_used_this_month + 1 })
    .eq("id", user.id);

  return NextResponse.json({
    id: listing.id,
    score: scoreResult,
  });
}
