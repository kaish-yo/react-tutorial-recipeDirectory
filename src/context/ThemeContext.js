import { createContext, useReducer } from "react";

// ThemeContext which is imported into useTheme.js that is a custom hook
export const ThemeContext = createContext();

// reducer, which is fired when dispatch function is activated
const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

// Provider to wrap the component to apply the following changes to
export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    color: "#58239c",
    mode: "dark",
  });

  const changeColor = (color) => {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };
  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>{children}</ThemeContext.Provider>;
}
