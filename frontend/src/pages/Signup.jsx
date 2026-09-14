import AuthLayout from "../components/auth/AuthLayout";
import AuthBrandPanel from "../components/auth/AuthBrandPanel";
import SignupForm from "../components/auth/SignupForm";

export default function Signup() {
  return (
    <AuthLayout>
      <AuthBrandPanel />
      <SignupForm />
    </AuthLayout>
  );
}