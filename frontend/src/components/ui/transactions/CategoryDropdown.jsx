import { useState, useEffect, useRef } from "react";
import { ChevronDown, Tag } from "lucide-react";
import { categoryMeta } from "../../../data/transactions";

export default function CategoryDropdown({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedMeta = categoryMeta[value];

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
        Category<span className="ml-0.5 text-rose-500">*</span>
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-[42px] w-full items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 text-[13.5px] text-slate-700 outline-none transition-colors focus:border-indigo-400"
      >
        {selectedMeta ? (
          <>
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${selectedMeta.iconBg}`}>
              <selectedMeta.icon size={13} strokeWidth={2} className={selectedMeta.iconColor} />
            </div>
            <span className="flex-1 text-left">{value}</span>
          </>
        ) : (
          <>
            <Tag size={15} strokeWidth={2} className="shrink-0 text-slate-400" />
            <span className="flex-1 text-left text-slate-400">Select category</span>
          </>
        )}
        <ChevronDown size={15} className="shrink-0 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {options.map((name) => {
            const meta = categoryMeta[name];
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
                {meta && (
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${meta.iconBg}`}>
                    <meta.icon size={13} strokeWidth={2} className={meta.iconColor} />
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