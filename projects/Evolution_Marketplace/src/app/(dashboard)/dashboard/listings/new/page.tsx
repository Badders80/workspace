import { createListingAction } from "@/app/actions/listings";
import { ListingForm } from "@/components/forms/listing-form";
import { Card } from "@/components/ui/card";
import { requireProfile } from "@/lib/auth";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function NewListingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { profile } = await requireProfile();
  const query = await searchParams;

  if (profile.role !== "owner") {
    return (
      <Card>
        <p className="eyebrow">Owner Workspace</p>
        <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">
          Only owner profiles can create listings.
        </h1>
      </Card>
    );
  }

  return (
    <ListingForm
      action={createListingAction}
      error={getSearchValue(query.error)}
      message={getSearchValue(query.message)}
      submitLabel="Create listing"
    />
  );
}
