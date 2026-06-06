import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

interface ThemeContextType {

  darkMode: boolean;

  toggleDarkMode: () => void;
}

const ThemeContext =
  createContext<ThemeContextType | null>(
    null
  );

export function ThemeProvider({

  children

}: {

  children: React.ReactNode
}) {

  const [darkMode, setDarkMode] =
    useState(false);

  // =========================
  // Load Theme
  // =========================

  useEffect(() => {

    const savedTheme =
      localStorage.getItem(
        "darkMode"
      );

    if (savedTheme === "true") {

      setDarkMode(true);

      document.documentElement.classList.add(
        "dark"
      );
    }

  }, []);

  // =========================
  // Toggle Theme
  // =========================

  const toggleDarkMode =
    () => {

    const newMode =
      !darkMode;

    setDarkMode(newMode);

    localStorage.setItem(

      "darkMode",

      String(newMode)
    );

    if (newMode) {

      document.documentElement.classList.add(
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );
    }
  };

  return (

    <ThemeContext.Provider

      value={{
        darkMode,
        toggleDarkMode
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}

export function useTheme() {

  const context =
    useContext(ThemeContext);

  if (!context) {

    throw new Error(

      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}