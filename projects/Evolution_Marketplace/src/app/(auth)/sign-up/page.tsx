import { signUpAction } from "@/app/actions/auth";
import { AuthForm } from "@/components/forms/auth-form";
import { isDemoAuthEnabled } from "@/lib/env";
import { authCopy } from "@/modules/auth/copy";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;

  return (
    <main className="shell py-12">
      <AuthForm
        action={signUpAction}
        body={authCopy.signUpBody}
        demoMode={isDemoAuthEnabled}
        error={getSearchValue(query.error)}
        message={getSearchValue(query.message)}
        mode="sign-up"
        title={authCopy.signUpTitle}
      />
    </main>
  );
}
