export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f0f3fb] p-3 sm:p-4">
      <div className="flex w-full max-w-[480px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl lg:max-w-[860px] lg:flex-row">
        {children}
      </div>
    </div>
  );
}