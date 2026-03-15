import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageMessage } from "@/components/ui/page-message";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ProfileRow } from "@/lib/auth";

export function ProfileForm({
  action,
  profile,
  error,
  message,
}: {
  action: (formData: FormData) => void | Promise<void>;
  profile: ProfileRow | null;
  error?: string;
  message?: string;
}) {
  return (
    <Card>
      <p className="eyebrow">Profile Setup</p>
      <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">Market participant profile</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
        Set your operating role, preferred display currency, and market identity. NZD
        remains the native asset currency across all listings and offers.
      </p>
      <div className="mt-6">
        <PageMessage error={error} message={message} />
      </div>
      <form action={action} className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Full Name
          </span>
          <Input defaultValue={profile?.full_name ?? ""} name="fullName" required />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Display Name
          </span>
          <Input defaultValue={profile?.display_name ?? ""} name="displayName" required />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Company
          </span>
          <Input defaultValue={profile?.company_name ?? ""} name="companyName" />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Phone
          </span>
          <Input defaultValue={profile?.phone ?? ""} name="phone" />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Role
          </span>
          <Select defaultValue={profile?.role ?? "investor"} name="role">
            <option value="owner">Owner</option>
            <option value="investor">Investor</option>
          </Select>
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Preferred Display Currency
          </span>
          <Select
            defaultValue={profile?.preferred_display_currency ?? "NZD"}
            name="preferredDisplayCurrency"
          >
            <option value="NZD">NZD</option>
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="GBP">GBP</option>
          </Select>
        </label>
        <label className="space-y-2 text-sm md:col-span-2">
          <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Bio
          </span>
          <Textarea defaultValue={profile?.bio ?? ""} name="bio" />
        </label>
        <div className="md:col-span-2">
          <Button>Save profile</Button>
        </div>
      </form>
    </Card>
  );
}
