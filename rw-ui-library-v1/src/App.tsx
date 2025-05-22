import React from "react";
import { RwThemeProvider } from "./v1/theme/RwThemeContext";
import { RwThemeSwitcher } from "./v1/theme/RxThemeSwitcher";
import BasicComponentHome from "./x-test/BasicComponentHome";

const App: React.FC = () => {
  console.log("<APP>");
  return (
    <RwThemeProvider>
      <RwThemeSwitcher />
      <div className="flex items-center justify-center min-h-screen gap-8">
        <BasicComponentHome />
      </div>
    </RwThemeProvider>
  );
};

export default App;
