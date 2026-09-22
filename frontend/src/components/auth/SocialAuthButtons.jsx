import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4c-7.6 0-14.2 4.3-17.7 10.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6c-2 1.5-4.7 2.4-7.7 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.7 39.6 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.6 5.6C40.9 36.6 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5 3.3 9.3 7.9 10.8.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.4-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12c0-6.3-5.2-11.5-11.5-11.5z" />
    </svg>
  );
}

export default function SocialAuthButtons({ dividerLabel = "Or continue with" }) {
  const { signIn, isLoaded } = useSignIn();
  const [loadingStrategy, setLoadingStrategy] = useState(null); // "oauth_google" | "oauth_github" | null

  const isRedirecting = loadingStrategy !== null;

  const handleOAuth = (strategy) => {
    if (!isLoaded || isRedirecting) return;

    setLoadingStrategy(strategy);
    signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/?auth=success",
      })
      .catch(() => {
        setLoadingStrategy(null);
      });
  };

  return (
    <div>
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-[12px] text-slate-400">{dividerLabel}</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => handleOAuth("oauth_google")}
          disabled={isRedirecting}
          className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white text-[13.5px] font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loadingStrategy === "oauth_google" ? (
            <Loader2 size={16} className="animate-spin text-slate-400" />
          ) : (
            <GoogleIcon />
          )}
          {loadingStrategy === "oauth_google" ? "Redirecting..." : "Continue with Google"}
        </button>

        <button
          type="button"
          onClick={() => handleOAuth("oauth_github")}
          disabled={isRedirecting}
          className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white text-[13.5px] font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loadingStrategy === "oauth_github" ? (
            <Loader2 size={16} className="animate-spin text-slate-400" />
          ) : (
            <GitHubIcon />
          )}
          {loadingStrategy === "oauth_github" ? "Redirecting..." : "Continue with GitHub"}
        </button>
      </div>
    </div>
  );
}