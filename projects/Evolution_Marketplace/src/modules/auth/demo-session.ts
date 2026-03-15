import type { Database } from "@/types/database";

export const demoAuthCookieName = "evm-demo-persona";

export type DemoPersona = "visitor" | "investor" | "owner";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export const demoProfiles: Record<Exclude<DemoPersona, "visitor">, ProfileRow> = {
  investor: {
    auth_user_id: "demo-investor-auth",
    bio: "Demo investor profile for Phase 1 workflow validation.",
    company_name: "Southern Bloodstock Capital",
    created_at: "2026-03-11T00:00:00.000Z",
    display_name: "Southern Capital",
    email: "investor-demo@evolution.example",
    full_name: "Demo Investor",
    id: "demo-investor-profile",
    onboarding_complete: true,
    phone: null,
    preferred_display_currency: "NZD",
    role: "investor",
    updated_at: "2026-03-11T00:00:00.000Z",
  },
  owner: {
    auth_user_id: "demo-owner-auth",
    bio: "Demo owner profile for listing and offer operations.",
    company_name: "Evolution Stables",
    created_at: "2026-03-11T00:00:00.000Z",
    display_name: "Evolution Stables",
    email: "owner-demo@evolution.example",
    full_name: "Demo Owner",
    id: "demo-owner-profile",
    onboarding_complete: true,
    phone: null,
    preferred_display_currency: "NZD",
    role: "owner",
    updated_at: "2026-03-11T00:00:00.000Z",
  },
};

export function resolveDemoPersona(input: string | null | undefined): DemoPersona {
  if (input === "owner" || input === "investor" || input === "visitor") {
    return input;
  }

  return "investor";
}

export function getDemoProfile(persona: DemoPersona) {
  if (persona === "visitor") {
    return null;
  }

  return demoProfiles[persona];
}
