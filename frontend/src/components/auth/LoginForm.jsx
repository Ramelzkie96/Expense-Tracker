import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Mail, ArrowRight } from "lucide-react";
import PasswordInput from "./PasswordInput";
import SocialAuthButtons from "./SocialAuthButtons";

export default function LoginForm() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setError("");
    setIsSubmitting(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Welcome back!");
        navigate("/");
      } else {
        // Handles cases like requiring 2FA/email verification
        console.log("Sign in requires further steps:", result);
      }
    } catch (err) {
      const message = err.errors?.[0]?.message ?? "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col justify-center p-8 lg:w-[380px]">
      <h1 className="text-[24px] font-bold text-slate-800">Welcome Back!</h1>
      <p className="mt-1 mb-6 text-[13.5px] text-slate-500">
        Sign in to your account to continue managing your finances.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={15}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[42px] w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400"
            />
          </div>
        </div>

        <PasswordInput
          label="Password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[13px] text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-700">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-[12.5px] text-rose-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-[14px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95 disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
          {!isSubmitting && <ArrowRight size={16} />}
        </button>
      </form>

      <SocialAuthButtons dividerLabel="Or continue with" />

      <p className="mt-6 text-center text-[13px] text-slate-500">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Sign up
        </Link>
      </p>
    </div>
  );
}