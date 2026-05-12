import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (!password) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !serviceKey || !anonKey) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const verifyClient = createAdminClient(url, anonKey);
  const { error: signInError } = await verifyClient.auth.signInWithPassword({
    email: user.email,
    password,
  });

  if (signInError) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 403 });
  }

  const admin = createAdminClient(url, serviceKey);

  await admin.from("users").delete().eq("id", user.id);

  const { error } = await admin.auth.admin.deleteUser(user.id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
