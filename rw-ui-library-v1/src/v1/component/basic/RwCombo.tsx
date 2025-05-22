import React, { useState, useMemo } from "react";

export interface RwComboOption {
  label: string;
  value: string;
}

export interface RwComboProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: RwComboOption[];
  theme?: boolean;
  searchable?: boolean;
}

export const RwCombo: React.FC<RwComboProps> = ({
  label,
  options,
  theme = false,
  searchable = false,
  className = "",
  ...rest
}) => {
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchable || search.trim() === "") return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search, searchable]);

  const base =
    "px-3 py-2 border rounded text-sm cursor-pointer transition duration-200";
  const themedStyle = theme
    ? "bg-white border-[var(--solid-bg)] text-[var(--solid-bg)]"
    : "bg-white border-gray-400 text-gray-700";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-[var(--input-label-color)]">
          {label}
        </label>
      )}
      {searchable && (
        <input
          type="text"
          placeholder="Search..."
          className={`${base} ${themedStyle}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <select className={`${base} ${themedStyle} ${className}`} {...rest}>
        {filteredOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
