"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Home,
  Inbox,
  Calendar,
  Settings,
  ChevronDown,
  ChevronRight,
  Folder,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
type MenuItem = {
  href?: string;
  label: string;
  icon: LucideIcon;
  children?: { href: string; label: string }[];
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};
const menuGroups: MenuGroup[] = [
  {
    title: "Main",
    items: [
      { href: "/", label: "Home", icon: Home },
      { href: "/inbox", label: "Inbox", icon: Inbox },
      { href: "/calendar", label: "Calendar", icon: Calendar },
    ],
  },
  {
    title: "Projects",
    items: [
      {
        label: "Projects",
        icon: Folder,
        children: [
          { href: "/projects/1", label: "Project A" },
          { href: "/projects/2", label: "Project B" },
        ],
      },
    ],
  },
];

export default function Sidebar({
  isOpen,
  isCollapsed,
}: {
  isOpen: boolean;
  isCollapsed: boolean;
}) {
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        panelRef.current &&
        buttonRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <aside
      className={clsx(
        "bg-gray-100 dark:bg-[#171717] border-r border-gray-200 dark:border-gray-900 h-screen flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        !isOpen && "hidden md:flex"
      )}>
      <div className="p-4 font-bold text-lg truncate">
        {!isCollapsed && "My App"}
      </div>

      <nav className="flex-1 p-2 space-y-4 overflow-y-auto">
        {menuGroups.map((group) => (
          <div key={group.title}>
            {/* Group title */}
            <div className="px-3 py-1 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              {group.title}
            </div>

            {/* Items */}
            {group.items.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleGroup(item.label)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                    {!isCollapsed && (
                      <span>
                        {openGroups.includes(item.label) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </button>

                  {openGroups.includes(item.label) && !isCollapsed && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-gray-300 dark:border-gray-700">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-3 py-2 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-800 ml-2">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              )
            )}
          </div>
        ))}
      </nav>

      {/* Settings Dropdown */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 relative">
        <button
          ref={buttonRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={clsx(
            "flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800",
            isDropdownOpen && "bg-gray-200 dark:bg-gray-800"
          )}>
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </button>

        {isDropdownOpen && (
          <div
            ref={panelRef}
            className="absolute left-full bottom-0 mb-4 ml-0 w-48 rounded-md bg-gray-800 dark:bg-gray-900 shadow-lg p-2 z-20">
            <Link
              href="/profile"
              className="block px-3 py-2 rounded text-sm hover:bg-gray-700 dark:hover:bg-gray-700">
              Profile
            </Link>
            <Link
              href="/preferences"
              className="block px-3 py-2 rounded text-sm hover:bg-gray-700 dark:hover:bg-gray-700">
              Preferences
            </Link>
            <Link
              href="/help"
              className="block px-3 py-2 rounded text-sm hover:bg-gray-700 dark:hover:bg-gray-700">
              Help
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
