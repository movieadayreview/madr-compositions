import React, { createContext, useContext } from "react";
import { THEMES, type Theme } from "./themes";

const ThemeContext = createContext<Theme>(THEMES.launch);

export const ThemeProvider: React.FC<{
  theme: Theme;
  children: React.ReactNode;
}> = ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
