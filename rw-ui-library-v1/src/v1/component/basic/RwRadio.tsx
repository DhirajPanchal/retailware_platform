import React from "react";

export interface RwRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  theme?: boolean;
}

export const RwRadio: React.FC<RwRadioProps> = ({
  label,
  theme = true,
  className = "",
  ...rest
}) => {
  const base =
    "inline-flex items-center gap-2 cursor-pointer text-sm font-medium";
  const radioStyle = theme ? "accent-[var(--solid-bg)]" : "accent-gray-500"; // fallback for non-themed

  return (
    <label className={`${base} ${className}`}>
      <input type="radio" className={radioStyle} {...rest} />
      {label}
    </label>
  );
};
