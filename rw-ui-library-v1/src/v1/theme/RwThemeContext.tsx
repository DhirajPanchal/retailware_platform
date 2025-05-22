import React, { createContext, useContext, useState, useEffect } from "react";

type RwTheme = "rw-default-theme" | "rw-hsbc-theme" | "rw-blue-theme";

type RwThemeContextType = {
  theme: RwTheme;
  setTheme: (theme: RwTheme) => void;
};

//
// ThemeContext
//

const RwThemeContext = createContext<RwThemeContextType | undefined>(undefined);

//
// ThemeProvider
//

export const RwThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<RwTheme>("rw-default-theme");

  useEffect(() => {
    console.log("THEME : " + theme);

    document.documentElement.className = theme;
  }, [theme]);

  return (
    <RwThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </RwThemeContext.Provider>
  );
};

//
// useTheme Hook
//

export const useRwTheme = () => {
  const context = useContext(RwThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
