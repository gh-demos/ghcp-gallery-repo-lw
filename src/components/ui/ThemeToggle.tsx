"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const THEME_ICON = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

function applyTheme(theme: ThemeMode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);
  const root = document.documentElement;

  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
  root.setAttribute("data-theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
      setTheme(savedTheme);
      if (document.documentElement.getAttribute("data-theme") !== savedTheme) {
        applyTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const Icon = THEME_ICON[theme];

  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-600 dark:text-slate-300" aria-hidden="true" />
      <label htmlFor="theme-toggle" className="sr-only">
        Theme
      </label>
      <select
        id="theme-toggle"
        aria-label="Select theme"
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
        value={theme}
        onChange={(event) => {
          const nextTheme = event.target.value as ThemeMode;
          setTheme(nextTheme);
          localStorage.setItem(STORAGE_KEY, nextTheme);
          applyTheme(nextTheme);
        }}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
