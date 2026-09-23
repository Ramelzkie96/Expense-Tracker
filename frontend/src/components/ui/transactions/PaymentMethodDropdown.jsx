import { useState, useEffect, useRef } from "react";
import { ChevronDown, CreditCard } from "lucide-react";
import { resolveIcon, resolvePaymentImage } from "../../../lib/iconResolvers";

export default function PaymentMethodDropdown({ value, onChange, paymentMethods, isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selected = paymentMethods.find((m) => m.name === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function renderIcon(method, size = 13) {
    if (method.is_image) {
      const src = resolvePaymentImage(method.icon_key);
      return <img src={src} alt="" className="h-3.5 w-3.5 object-contain" />;
    }
    const Icon = resolveIcon(method.icon_key);
    return <Icon size={size} strokeWidth={2} className={method.icon_color} />;
  }

  return (
    <div className="relative" ref={containerRef}>
      <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
        Payment Method<span className="ml-0.5 text-rose-500">*</span>
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        disabled={isLoading}
        className="flex h-[42px] w-full items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 text-[13.5px] text-slate-700 outline-none transition-colors focus:border-indigo-400 disabled:opacity-60"
      >
        {selected ? (
          <>
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${selected.icon_bg}`}>
              {renderIcon(selected)}
            </div>
            <span className="flex-1 text-left">{selected.name}</span>
          </>
        ) : (
          <>
            <CreditCard size={15} strokeWidth={2} className="shrink-0 text-slate-400" />
            <span className="flex-1 text-left text-slate-400">
              {isLoading ? "Loading payment methods..." : "Select payment method"}
            </span>
          </>
        )}
        <ChevronDown size={15} className="shrink-0 text-slate-400" />
      </button>

      {isOpen && !isLoading && (
        <div className="absolute z-20 mt-1.5 max-h-[240px] w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          {paymentMethods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                onChange(m);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[13.5px] text-slate-700 transition-colors hover:bg-slate-50"
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${m.icon_bg}`}>
                {renderIcon(m)}
              </div>
              {m.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}