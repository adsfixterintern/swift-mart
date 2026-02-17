"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded-lg bg-primary text-white"
    >
      {theme === "dark" ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
