"use client";
import { useTheme } from "next-themes";
import { Menu, PanelLeftClose, PanelLeftOpen, Sun, Moon } from "lucide-react";

export default function Navbar({
  onToggleSidebar,
  onCollapseSidebar,
}: {
  onToggleSidebar: () => void;
  onCollapseSidebar: () => void;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-950 border-b dark:border-gray-800">
      <div className="flex items-center gap-2">
        {/* Mobile toggle (show/hide) */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop collapse (full ↔ icon) */}
        <button
          onClick={onCollapseSidebar}
          className="hidden md:block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <PanelLeftClose className="w-5 h-5" />
        </button>

        <span className="font-semibold">Dashboard</span>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </header>
  );
}
