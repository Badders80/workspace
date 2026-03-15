import { NextResponse } from "next/server";
import {
  demoAuthCookieName,
  resolveDemoPersona,
} from "@/modules/auth/demo-session";

function getNextPath(value: string | null) {
  if (!value || !value.startsWith("/")) {
    return "/marketplace";
  }

  return value;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const persona = resolveDemoPersona(url.searchParams.get("persona"));
  const nextPath = getNextPath(url.searchParams.get("next"));
  const response = NextResponse.redirect(new URL(nextPath, request.url));

  if (persona === "visitor") {
    response.cookies.delete(demoAuthCookieName);
    return response;
  }

  response.cookies.set(demoAuthCookieName, persona, {
    httpOnly: false,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
