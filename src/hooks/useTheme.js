import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Just the intermediary between ThemeContext.js and actual component files
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // Error handling. Basically what this intermediate hook additionally does for the context
  if (context === undefined) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return context;
};
