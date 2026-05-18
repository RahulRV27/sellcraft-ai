import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);
  const type = searchParams.get("type");

  let query = supabase
    .from("listings")
    .select("id, platform, category, product_name, quality_score, created_at")
    .eq("user_id", user.id);

  if (type === "scores") {
    query = query.is("generated_listing", null).not("quality_score", "is", null);
  } else {
    query = query.not("generated_listing", "is", null);
  }

  const { data: listings, error } = await query
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }

  return NextResponse.json({ listings });
}
