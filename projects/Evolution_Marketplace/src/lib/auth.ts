import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isDemoAuthEnabled } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  demoAuthCookieName,
  getDemoProfile,
  resolveDemoPersona,
} from "@/modules/auth/demo-session";
import type { Database } from "@/types/database";

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export interface AppUser {
  email: string | null;
  id: string;
  isDemo?: boolean;
}

export async function getCurrentUserContext() {
  if (isDemoAuthEnabled) {
    const cookieStore = await cookies();
    const persona = resolveDemoPersona(cookieStore.get(demoAuthCookieName)?.value);
    const profile = getDemoProfile(persona);

    return {
      user: profile
        ? ({
            email: profile.email,
            id: profile.auth_user_id ?? `${profile.id}-auth`,
            isDemo: true,
          } satisfies AppUser)
        : null,
      profile,
    };
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      user: null as AppUser | null,
      profile: null as ProfileRow | null,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null as AppUser | null,
      profile: null as ProfileRow | null,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  return {
    user: {
      email: user.email ?? null,
      id: user.id,
    } satisfies AppUser,
    profile: profile ?? null,
  };
}

export async function requireUser() {
  const { user, profile } = await getCurrentUserContext();

  if (!user) {
    redirect("/sign-in");
  }

  return {
    user,
    profile,
  };
}

export async function requireProfile() {
  const { user, profile } = await requireUser();

  if (!profile) {
    redirect("/dashboard/profile?setup=1");
  }

  return {
    user,
    profile,
  };
}
