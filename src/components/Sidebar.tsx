"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Inbox,
  Calendar,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Folder,
  X,
  Menu,
} from "lucide-react";
import clsx from "clsx";

const menu = [
  { href: "/", label: "Home", icon: Home },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  {
    label: "Projects",
    icon: Folder,
    children: [
      { href: "/projects/1", label: "Project A" },
      { href: "/projects/2", label: "Project B" },
    ],
  },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  isOpen,
  isCollapsed,
}: {
  isOpen: boolean;
  isCollapsed: boolean;
}) {
  const [openPopover, setOpenPopover] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  return (
    <aside
      className={clsx(
        "bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        !isOpen && "hidden md:flex"
      )}
    >
      <div className="p-4 font-bold text-lg truncate">
        {!isCollapsed && "My App"}
      </div>

      <button
        onClick={() => setOpenPopover(!openPopover)}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        {openPopover ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menu.map((item) =>
          item.children ? (
            <div key={item.label}>
              {/* Parent button */}
              <button
                onClick={() => toggleGroup(item.label)}
                className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
              >
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

              {/* Submenu */}
              {openGroups.includes(item.label) && !isCollapsed && (
                <div className="ml-6 mt-1 space-y-1 border-l border-gray-300 dark:border-gray-700">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-3 py-2 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-800 ml-2"
                    >
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
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )
        )}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 mt-2">
          <Inbox className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
