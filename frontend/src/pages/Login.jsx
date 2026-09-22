import AuthLayout from "../components/auth/AuthLayout";
import AuthBrandPanel from "../components/auth/AuthBrandPanel";
import LoginForm from "../components/auth/LoginForm";
import { usePendingToast } from "../hooks/usePendingToast";

export default function Login() {
  usePendingToast();
  return (
    <AuthLayout>
      <AuthBrandPanel />
      <LoginForm />
    </AuthLayout>
  );
}