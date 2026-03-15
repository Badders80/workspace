import { saveProfileAction } from "@/app/actions/profile";
import { ProfileForm } from "@/components/forms/profile-form";
import { requireUser } from "@/lib/auth";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function DashboardProfilePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { profile } = await requireUser();
  const query = await searchParams;

  return (
    <ProfileForm
      action={saveProfileAction}
      error={getSearchValue(query.error)}
      message={getSearchValue(query.message) ?? (getSearchValue(query.setup) ? "Complete your participant profile to continue." : undefined)}
      profile={profile}
    />
  );
}
