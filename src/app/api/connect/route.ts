import { generateOAuthUrl } from "corsair/oauth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { corsair } from "@/server/corsair";
import { getCurrentUser } from "@/lib/get_current_user";

const REDIRECT_URI = `${process.env.APP_URL}/api/auth`;

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  
  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = user.id;

  const plugin = new URL(request.url).searchParams.get("plugin");
  if (!plugin) {
    return NextResponse.json(
      { error: "Missing plugin param" },
      { status: 400 },
    );
  }

  const { url, state } = await generateOAuthUrl(corsair, plugin, {
    tenantId: id,
    redirectUri: REDIRECT_URI,
  });

  const response = NextResponse.redirect(url);
  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
  });
  return response;
}
