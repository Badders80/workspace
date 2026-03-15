import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageMessage } from "@/components/ui/page-message";

interface AuthFormProps {
  title: string;
  body: string;
  action: (formData: FormData) => void | Promise<void>;
  error?: string;
  message?: string;
  mode: "sign-in" | "sign-up";
  demoMode?: boolean;
}

export function AuthForm({
  title,
  body,
  action,
  error,
  message,
  mode,
  demoMode = false,
}: AuthFormProps) {
  const submitLabel = demoMode
    ? mode === "sign-in"
      ? "Open Investor Session"
      : "Open Workspace"
    : mode === "sign-in"
      ? "Sign In"
      : "Create Account";

  return (
    <Card className="mx-auto max-w-xl">
      <p className="eyebrow">Secure Access</p>
      <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em] text-[var(--foreground)]">
        {title}
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)]">{body}</p>
      <div className="mt-6">
        <PageMessage error={error} message={message} />
      </div>
      {demoMode ? (
        <Card className="mt-6 border-[var(--line)] bg-[var(--surface-strong)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Demo session mode
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
            Supabase auth is bypassed locally. Email and password are not verified in this mode,
            and you can switch persona from the header or dashboard shell at any time.
          </p>
        </Card>
      ) : null}
      <form action={action} className="mt-6 space-y-4">
        <label className="block space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Email
          </span>
          <Input name="email" type="email" required />
        </label>
        <label className="block space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Password
          </span>
          <Input name="password" type="password" minLength={8} required />
        </label>
        {mode === "sign-up" ? (
          <label className="block space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              {demoMode ? "Workspace role" : "Account role"}
            </span>
            <select
              name="requestedRole"
              defaultValue="investor"
              className="w-full rounded-[22px] border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
            >
              <option value="investor">Investor</option>
              <option value="owner">Owner</option>
            </select>
          </label>
        ) : null}
        <Button wide>{submitLabel}</Button>
      </form>
      <p className="mt-4 text-sm text-[var(--muted)]">
        {mode === "sign-in" ? "Need an account?" : "Already have an account?"}{" "}
        <Link
          href={mode === "sign-in" ? "/sign-up" : "/sign-in"}
          className="font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
        >
          {mode === "sign-in" ? "Create one" : "Sign in"}
        </Link>
      </p>
    </Card>
  );
}
