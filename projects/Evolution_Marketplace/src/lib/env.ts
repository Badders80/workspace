import { z } from "zod";

function optionalEnv(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  DEV_AUTH_BYPASS: z.coerce.boolean().default(false),
  NEXT_PUBLIC_FX_USD: z.coerce.number().default(0.6),
  NEXT_PUBLIC_FX_AUD: z.coerce.number().default(0.92),
  NEXT_PUBLIC_FX_GBP: z.coerce.number().default(0.47),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  NEXT_PUBLIC_SUPABASE_URL: optionalEnv(process.env.NEXT_PUBLIC_SUPABASE_URL),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalEnv(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
  SUPABASE_SERVICE_ROLE_KEY: optionalEnv(process.env.SUPABASE_SERVICE_ROLE_KEY),
  DEV_AUTH_BYPASS: process.env.DEV_AUTH_BYPASS ?? "false",
  NEXT_PUBLIC_FX_USD: process.env.NEXT_PUBLIC_FX_USD ?? "0.60",
  NEXT_PUBLIC_FX_AUD: process.env.NEXT_PUBLIC_FX_AUD ?? "0.92",
  NEXT_PUBLIC_FX_GBP: process.env.NEXT_PUBLIC_FX_GBP ?? "0.47",
});

export const isSupabaseConfigured = Boolean(
  env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const isDemoAuthEnabled =
  env.DEV_AUTH_BYPASS && process.env.NODE_ENV !== "production";
