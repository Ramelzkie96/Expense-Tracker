import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { User, Mail, Phone, ArrowRight } from "lucide-react";
import PasswordInput from "./PasswordInput";
import SocialAuthButtons from "./SocialAuthButtons";

export default function SignupForm() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const [firstName, ...rest] = fullName.trim().split(" ");
      const lastName = rest.join(" ");

      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
        // Clerk stores phone via a separate field name; adjust based on
        // whether you've enabled phone number as an identifier in your
        // Clerk dashboard instance.
        phoneNumber: phone,
      });

      // Trigger Clerk's email verification flow
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      navigate("/verify-email");
    } catch (err) {
      setError(err.errors?.[0]?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col justify-center p-8 lg:w-[380px]">
      <h1 className="text-[24px] font-bold text-slate-800">Create Your Account</h1>
      <p className="mt-1 mb-6 text-[13.5px] text-slate-500">
        Join Expense Tracker and start your journey to better financial health.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
            Full Name<span className="ml-0.5 text-rose-500">*</span>
          </label>
          <div className="relative">
            <User
              size={15}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              required
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-[42px] w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
            Email Address<span className="ml-0.5 text-rose-500">*</span>
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

        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
            Phone Number<span className="ml-0.5 text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone
              size={15}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="tel"
              required
              placeholder="+63 9XX XXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-[42px] w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400"
            />
          </div>
        </div>

        <PasswordInput
          label="Password"
          required
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm Password"
          required
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-[12.5px] text-rose-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-[14px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95 disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
          {!isSubmitting && <ArrowRight size={16} />}
        </button>

        <p className="text-center text-[12px] text-slate-400">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-indigo-600 hover:text-indigo-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700">
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      <SocialAuthButtons dividerLabel="Or sign up with" />

      <p className="mt-6 text-center text-[13px] text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Log in
        </Link>
      </p>
    </div>
  );
}