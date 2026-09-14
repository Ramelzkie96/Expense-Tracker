import AuthLayout from "../components/auth/AuthLayout";
import AuthBrandPanel from "../components/auth/AuthBrandPanel";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout>
      <AuthBrandPanel />
      <LoginForm />
    </AuthLayout>
  );
}