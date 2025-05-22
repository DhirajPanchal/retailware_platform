import React from "react";

export interface RwCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  theme?: boolean;
}

export const RwCheckbox: React.FC<RwCheckboxProps> = ({
  label,
  theme = true,
  className = "",
  ...rest
}) => {
  const base =
    "inline-flex items-center gap-2 cursor-pointer text-sm font-medium";
  const checkboxStyle = theme
    ? "accent-[var(--btn-bg)]"
    : "accent-gray-500";

  return (
    <label className={`${base} ${className}`}>
      <input type="checkbox" className={checkboxStyle} {...rest} />
      {label}
    </label>
  );
};
