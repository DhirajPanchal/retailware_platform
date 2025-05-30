import React from "react";
import { RwThemeProvider } from "./v1/theme/RwThemeContext";
import { RwThemeSwitcher } from "./v1/theme/RxThemeSwitcher";
import BasicComponentHome from "./x-test/BasicComponentHome";
import { DatagridExpo } from "./x-test/DatagridExpo";

const App: React.FC = () => {
  console.log("<APP>");
  return (
    <RwThemeProvider>
      <RwThemeSwitcher />

      <div className="flex items-center justify-center min-h-screen gap-8">
        <BasicComponentHome />
        <DatagridExpo />
      </div>

      <div className="p-8 m-8"></div>
    </RwThemeProvider>
  );
};

export default App;
