import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      // Check localStorage first
      const saved = localStorage.getItem("theme");
      if (saved) {
        return saved === "dark";
      }
      // Check system preference
      if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    console.log("Dark mode:", dark);
    try {
      const root = document.documentElement;

      if (dark) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
        console.log("Dark mode enabled, classes:", root.className);
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
        console.log("Light mode enabled, classes:", root.className);
      }
    } catch (e) {
      console.error("Theme error:", e);
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
