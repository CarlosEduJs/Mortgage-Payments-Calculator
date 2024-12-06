import { useState } from "react";

export const InputField = ({
  label,
  error,
  value,
  onChange,
  content,
  reverse,
  isRadio,
  options = [],
  name,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-neutral-slate-700 font-medium text-xs">
        {label}
      </label>

      {isRadio ? (
        <div className="flex flex-col gap-2">
            
          {options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-all hover:border-primary-lime ${
                value === option.value
                  ? "bg-yellow-100/40 border-yellow-400"
                  : "border-neutral-slate-300"
              } ${error ? "border-primary-red" : ""}`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />

              <span
                className={`w-4 h-4 flex-shrink-0 border-2 rounded-full flex items-center justify-center ${
                  value === option.value
                    ? "border-yellow-400 bg-yellow-100"
                    : "border-neutral-slate-300"
                }`}
              >
                {value === option.value && (
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                )}
              </span>

              <span
                className={`text-sm font-bold ${
                  value === option.value ? "text-neutral-slate-900" : ""
                }`}
              >
                {option.label}
              </span>
              
            </label>
          ))}
          {error && <p className="text-xs text-primary-red font-bold my-3">{error}</p>}
        </div>
      ) : (
        <div className={`flex flex-col`}>
          <div
            className={`flex items-center cursor-pointer min-w-fit gap-2 rounded-md border  transition-all ${
              reverse ? "flex-row-reverse" : ""
            } ${error ? " border-primary-red" : "border-neutral-slate-300"} ${
              isFocused ? "border-primary-lime" : ""
            }`}
          >
            <div
              className={` text-neutral-slate-500 font-bold px-3 py-2 transition-all ${
                reverse ? "rounded-r-md" : "rounded-l-md"
              } ${
                error
                  ? "bg-primary-red  text-white"
                  : isFocused
                  ? "bg-primary-lime text-slate-900"
                  : "bg-neutral-slate-100"
              }`}
            >
              {content}
            </div>
            <input
              type="text"
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`bg-transparent outline-none w-full text-left py-1 px-2 text-sm font-bold ${
                error ? "text-primary-red" : "text-neutral-slate-900"
              }`}
            />
          </div>
          {error && <p className="text-xs text-primary-red font-bold my-3">{error}</p>}
        </div>
      )}
    </div>
  );
};
