"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react"; // Using Lucide Icons

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
    >
      {theme === "dark" ? (
        <Sun size={20} className="hover:text-yellow-500 transition-colors" />
      ) : (
        <Moon size={20} className="hover:text-blue-500 transition-colors" />
      )}
    </button>
  );
}