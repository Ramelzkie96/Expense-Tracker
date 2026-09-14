export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f3fb] p-4">
      <div className="flex w-full max-w-[860px] overflow-hidden rounded-2xl bg-white shadow-xl">
        {children}
      </div>
    </div>
  );
}