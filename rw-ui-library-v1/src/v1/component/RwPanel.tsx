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

const headerStyleMap: Record<string, string> = {
  solid: "text-[var(--btn-text)] border-b border-[var(--btn-border)]",
  outline: "bg-transparent text-[var(--btn-bg)] border-b border-gray-400",
};

export const RwPanel: React.FC<RwPanelProps> = ({
  title,
  icon,
  collapsible = false,
  solid = false,
  theme = false,
  rounded = false,
  className = "border-2 border-gray-400 p-2",
  children,
  footer,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const base = "transition duration-200 shadow-sm flex flex-col";
  const borderRadius = rounded ? "rounded-lg overflow-hidden" : "";
  const headerBorderRadius = rounded ? "rounded-t-lg" : "";
  const variant = solid ? "solid" : "outline";
  const headerClass = theme
    ? headerStyleMap[variant]
    : " text-black border-b border-gray-400";

  const headerBG = theme && solid ? " bg-[var(--btn-bg)] " : "";

  //bg-[var(--btn-bg)]

  return (
    <div className={`${base} ${borderRadius} ${className}`}>
      {(title || icon || collapsible) && (
        <div
          className={`px-4 py-2 flex items-center justify-between ${headerClass} ${headerBG} ${headerBorderRadius}`}
        >
          <div className="flex items-center gap-2 font-semibold text-base">
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
