"use client";

import { useSearchParams } from "next/navigation";
import useMount from "react-use/lib/useMount";
import { Spinner } from "@/components/spinner";
import { Trans } from "@/i18n/client";
import { authClient } from "@/lib/auth-client";
import { validateRedirectUrl } from "@/utils/redirect";

export function OIDCAutoSignIn({
  providerId = "oidc",
  destinationName,
}: {
  providerId?: string;
  destinationName?: string;
} = {}) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  useMount(() => {
    authClient.signIn.oauth2({
      providerId,
      callbackURL: validateRedirectUrl(redirectTo) || "/",
      errorCallbackURL: "/login?error=OAuthSignInFailed",
    });
  });

  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <Spinner />
        <div className="text-muted-foreground text-sm">
          {destinationName ? (
            `You are being redirected to ${destinationName}…`
          ) : (
            <Trans
              i18nKey="oidcAutoSignInDescription"
              defaults="You are being redirected to the login page..."
            />
          )}
        </div>
      </div>
    </div>
  );
}
