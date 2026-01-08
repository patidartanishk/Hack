import { useTheme } from "@/components/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition ${className}`}
    >
      {theme === "dark" ? (
        <>
          <Moon size={16} />
          <span>Dark</span>
        </>
      ) : (
        <>
          <Sun size={16} />
          <span>Light</span>
        </>
      )}
    </button>
  );
}
