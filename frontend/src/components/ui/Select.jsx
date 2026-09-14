import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  required = false,
  icon: Icon,
  placeholder,
  options = [],
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
            <Icon size={15} strokeWidth={2} />
          </span>
        )}

        <select
          value={value}
          onChange={onChange}
          className={`h-[42px] w-full appearance-none rounded-lg border border-slate-200 bg-white pr-9 text-[13.5px] outline-none transition-colors focus:border-indigo-400 ${
            Icon ? "pl-9" : "pl-3"
          } ${value ? "text-slate-700" : "text-slate-400"}`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-slate-700">
              {opt}
            </option>
          ))}
        </select>

        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}