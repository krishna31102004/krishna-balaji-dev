import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";

export const PALETTES = [
  { id: "onyx", label: "Onyx", swatch: "#a1a1aa", festive: false },
  { id: "ocean", label: "Ocean", swatch: "#3b82f6", festive: false },
  { id: "grape", label: "Grape", swatch: "#a855f7", festive: false },
  { id: "christmas", label: "Christmas", swatch: "🎄", festive: true },
  { id: "diwali", label: "Diwali", swatch: "🪔", festive: true },
  { id: "halloween", label: "Halloween", swatch: "🎃", festive: true },
] as const;

export type Palette = (typeof PALETTES)[number]["id"];

type ThemeOrigin = {
  x: number;
  y: number;
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (origin?: ThemeOrigin) => void;
  setTheme: (theme: Theme, origin?: ThemeOrigin) => void;
  palette: Palette;
  setPalette: (palette: Palette, origin?: ThemeOrigin) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const stored = localStorage.getItem("theme");

    if (stored === "light" || stored === "dark") {
      return stored;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  const [palette, setPaletteState] = useState<Palette>(() => {
    if (typeof window === "undefined") return "onyx";
    const stored = localStorage.getItem("palette");
    return PALETTES.some((p) => p.id === stored)
      ? (stored as Palette)
      : "onyx";
  });

  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    localStorage.setItem("palette", palette);
  }, [palette]);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = (
    nextTheme: Theme,
    origin?: ThemeOrigin
  ) => {
    if (nextTheme === theme) return;
    runTransition(() => setThemeState(nextTheme), origin);
  };

  const setPalette = (
    nextPalette: Palette,
    origin?: ThemeOrigin
  ) => {
    if (nextPalette === palette) return;
    runTransition(() => setPaletteState(nextPalette), origin);
  };

  const runTransition = (
    apply: () => void,
    origin?: ThemeOrigin
  ) => {

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;

    document.documentElement.style.setProperty(
      "--theme-x",
      `${x}px`
    );

    document.documentElement.style.setProperty(
      "--theme-y",
      `${y}px`
    );

    const documentWithTransition = document as Document & {
      startViewTransition?: (
        callback: () => void
      ) => {
        ready: Promise<void>;
        finished: Promise<void>;
      };
    };

    /*
     * Browser supports View Transitions
     */
    if (documentWithTransition.startViewTransition) {
      documentWithTransition.startViewTransition(() => {
        flushSync(apply);
      });

      return;
    }

    /*
     * Fallback for browsers that don't support
     * View Transition API.
     */
    apply();
  };

  const toggleTheme = (origin?: ThemeOrigin) => {
    changeTheme(
      theme === "dark" ? "light" : "dark",
      origin
    );
  };

  const setTheme = (
    nextTheme: Theme,
    origin?: ThemeOrigin
  ) => {
    changeTheme(nextTheme, origin);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        palette,
        setPalette,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within a ThemeProvider"
    );
  }

  return context;
}