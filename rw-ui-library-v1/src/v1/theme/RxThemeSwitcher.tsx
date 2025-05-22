import React from "react";
import { useRwTheme } from "./RwThemeContext";

export const RwThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useRwTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as any)}
      className="absolute top-4 right-4 border px-2 py-1"
    >
      <option value="rw-default-theme">Default</option>
      <option value="rw-hsbc-theme">HSBC</option>
      <option value="rw-blue-theme">Blue</option>
    </select>
  );
};
