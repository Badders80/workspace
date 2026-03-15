"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env, isDemoAuthEnabled, isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { demoAuthCookieName } from "@/modules/auth/demo-session";

function toErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

export async function signInAction(formData: FormData) {
  if (isDemoAuthEnabled) {
    const cookieStore = await cookies();
    cookieStore.set(demoAuthCookieName, "investor", {
      httpOnly: false,
      path: "/",
      sameSite: "lax",
    });
    redirect("/dashboard");
  }

  if (!isSupabaseConfigured) {
    redirect("/sign-in?error=Configure%20Supabase%20first");
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/sign-in?error=Supabase%20client%20unavailable");
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/sign-in?error=${encodeURIComponent(toErrorMessage(error))}`);
  }

  redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  if (isDemoAuthEnabled) {
    const cookieStore = await cookies();
    const requestedRole = String(formData.get("requestedRole") ?? "investor");

    cookieStore.set(
      demoAuthCookieName,
      requestedRole === "owner" ? "owner" : "investor",
      {
        httpOnly: false,
        path: "/",
        sameSite: "lax",
      },
    );

    redirect("/dashboard");
  }

  if (!isSupabaseConfigured) {
    redirect("/sign-up?error=Configure%20Supabase%20first");
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/sign-up?error=Supabase%20client%20unavailable");
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/sign-up?error=${encodeURIComponent(toErrorMessage(error))}`);
  }

  if (data.session) {
    redirect("/dashboard/profile?welcome=1");
  }

  redirect("/sign-in?message=Check%20your%20email%20to%20confirm%20the%20account");
}

export async function signOutAction() {
  if (isDemoAuthEnabled) {
    const cookieStore = await cookies();
    cookieStore.delete(demoAuthCookieName);
    redirect("/marketplace");
  }

  const supabase = await createServerSupabaseClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/");
}
