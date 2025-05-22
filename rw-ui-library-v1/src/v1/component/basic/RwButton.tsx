export interface RwButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  solid?: boolean;
  theme?: boolean;
  rounded?: boolean;
}

const styleMap: Record<string, string> = {
  solid: "bg-gray-400 text-white hover:bg-gray-200 hover:text-gray-600",
  outline: "text-gray-600 border border-gray-400 hover:bg-gray-200",

  solid_theme: "bg-btn-bg text-btn-text hover:bg-gray-200 hover:text-btn-bg",
  outline_theme: "text-btn-bg border border-btn-bg hover:bg-gray-200",
};

export const RwButton: React.FC<RwButtonProps> = ({
  children,
  solid = false,
  theme = false,
  rounded = false,
  className = "",
  ...rest
}) => {
  console.log("<RwButton>");

  let base =
    "px-4 py-2 text-sm font-medium transition duration-200 align-middle";
  if (rounded) {
    base += " rounded";
  }

  let variant = solid === true ? "solid" : "outline";
  if (theme === true) {
    variant += "_theme";
  }
  const finalClass = [base, styleMap[variant], className].join(" ");

  return (
    <button className={finalClass} {...rest}>
      {children}
    </button>
  );
};
