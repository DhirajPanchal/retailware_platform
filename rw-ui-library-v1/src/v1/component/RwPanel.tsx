import React, { useState } from "react";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

export interface RwPanelProps {
  title?: string;
  icon?: React.ReactNode;
  collapsible?: boolean;
  solid?: boolean; // Applies to header only
  theme?: boolean;
  rounded?: boolean;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const bodyStyleMap: Record<string, string> = {
  solid: "bg-gray-400 text-white border-b border-gray-400",
  outline: "text-gray-600 border-b border-gray-400",
  solid_theme: "bg-[var(--solid-bg)] text-[var(--solid-text)] border-b border-[var(--solid-border)]",
  outline_theme: "bg-transparent text-[var(--solid-bg)] border-b border-gray-400",
};

const headerStyleMap: Record<string, string> = {
  solid: "bg-gray-400 text-white border-b border-gray-400",
  outline: "text-gray-600 border-b border-gray-400",
  solid_theme: "bg-[var(--solid-bg)] text-[var(--solid-text)] border-b border-[var(--solid-border)]",
  outline_theme: "bg-transparent text-[var(--solid-bg)] border-b border-gray-400",
};


export const RwPanel: React.FC<RwPanelProps> = ({
  title,
  icon,
  collapsible = false,
  solid = false,
  theme = false,
  rounded = false,
  className = "",
  children,
  footer,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const base =
    "transition duration-200 flex flex-col border-1 border-gray-400 shadow-md";

  const borderRadius = rounded ? "rounded-lg overflow-hidden" : "";

  const headerBorderRadius = rounded ? "rounded-t-lg" : "";

  let variant = solid ? "solid" : "outline";
  variant = theme ? variant + "_theme" : variant;
  const headerClass = headerStyleMap[variant];
  //const headerBG = theme && solid ? " bg-[var(--solid-bg)] " : "";

  return (
    <div className={`${base} ${borderRadius} ${className}`}>
      {(title || icon || collapsible) && (
        <div
          className={`px-4 py-2 flex items-center justify-between ${headerClass}  ${headerBorderRadius}`}
        >
          <div className="flex items-center gap-2 font-semibold text-base">
            {variant}
            {icon && <span>{icon}</span>}
            {title && <span>{title}</span>}
          </div>
          {collapsible && (
            <button
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="text-xl"
              aria-label={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? (
                <IoChevronForwardOutline />
              ) : (
                <IoChevronDownOutline />
              )}
            </button>
          )}
        </div>
      )}

      {!isCollapsed && <div>{children}</div>}

      {!isCollapsed && footer && (
        <div className="px-4 py-2 border-t border-gray-400">{footer}</div>
      )}
    </div>
  );
};
