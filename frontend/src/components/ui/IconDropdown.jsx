import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function IconDropdown({
  label,
  required = false,
  placeholder,
  placeholderIcon: PlaceholderIcon,
  value,
  onChange,
  options,
  meta, // { [optionName]: { icon, isImage?, iconBg, iconColor } }
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedMeta = meta[value];

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function renderIcon(itemMeta, size = 13) {
    if (!itemMeta) return null;
    if (itemMeta.isImage) {
      return <img src={itemMeta.icon} alt="" className="h-3.5 w-3.5 object-contain" />;
    }
    const Icon = itemMeta.icon;
    return <Icon size={size} strokeWidth={2} className={itemMeta.iconColor} />;
  }

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-rose-500">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-[42px] w-full items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 text-[13.5px] text-slate-700 outline-none transition-colors focus:border-indigo-400"
      >
        {selectedMeta ? (
          <>
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${selectedMeta.iconBg}`}>
              {renderIcon(selectedMeta)}
            </div>
            <span className="flex-1 text-left">{value}</span>
          </>
        ) : (
          <>
            {PlaceholderIcon && (
              <PlaceholderIcon size={15} strokeWidth={2} className="shrink-0 text-slate-400" />
            )}
            <span className="flex-1 text-left text-slate-400">{placeholder}</span>
          </>
        )}
        <ChevronDown size={15} className="shrink-0 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {options.map((name) => {
            const itemMeta = meta[name];
            return (
              <button
                key={name}
                type="button"
                onClick={() => {
                  onChange(name);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[13.5px] text-slate-700 transition-colors hover:bg-slate-50"
              >
                {itemMeta && (
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${itemMeta.iconBg}`}>
                    {renderIcon(itemMeta)}
                  </div>
                )}
                {name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}