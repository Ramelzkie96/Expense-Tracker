export default function Input({
  label,
  required = false,
  labelSuffix,
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-rose-500">*</span>}
          {labelSuffix}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={15} strokeWidth={2} />
          </span>
        )}
        <input
          {...props}
          className={`h-[42px] w-full rounded-lg border border-slate-200 bg-white text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400 ${
            Icon ? "pl-9 pr-3" : "px-3"
          }`}
        />
      </div>
    </div>
  );
}