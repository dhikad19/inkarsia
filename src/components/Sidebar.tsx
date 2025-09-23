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
  LogOut,
  Info,
  Folder,
  Bell,
} from "lucide-react";
import { useUser } from "@/app/providers";
import { LucideIcon, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  const user = useUser();

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
        "bg-gray-100 sticky top-0 dark:bg-[#171717] border-r border-gray-200 dark:border-gray-900 h-screen flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        !isOpen && "hidden md:flex"
      )}
    >
      <div className="p-3 truncate flex justify-between items-center">
        <div className="flex">
          <Image
            src={
              theme === "dark"
                ? "/assets/logo-dark.png"
                : "/assets/logo-light.png"
            }
            style={{ objectFit: "contain" }}
            alt="Morials"
            className={!isCollapsed ? "ml-2" : ""}
            width={38}
            height={33}
          />
          {!isCollapsed && (
            <>
              <div className="ml-3 mb-0.5">
                <h4 className="text-md font-bold leading-none mt-1 mb-0">
                  Morials Project
                </h4>
                <div className="text-sm mt-0.5">Sketch</div>
              </div>
            </>
          )}
        </div>
        {!isCollapsed && <ChevronsUpDown className="w-4 h-4" />}
      </div>

      <nav
        className={`flex-1 p-2 overflow-y-auto transition duration-0 ${
          !isCollapsed ? "space-y-4" : ""
        }`}
      >
        {menuGroups.map((group) => (
          <div key={group.title}>
            {!isCollapsed && (
              <div className="px-3 py-1 text-sm">{group.title}</div>
            )}
            {group.items.map((item) =>
              item.children ? (
                <div key={item.label}>
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
                  className="flex items-center gap-3 px-3 text-md py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              )
            )}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800 relative">
        <button
          ref={buttonRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={clsx(
            "flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800",
            isDropdownOpen && "bg-gray-200 dark:bg-gray-800"
          )}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </button>

        {isDropdownOpen && (
          <div
            style={{ borderRadius: "7px" }}
            ref={panelRef}
            className="absolute rounded-xl border shadow-md border-gray-200 left-full bottom-0 mb-4 ml-0 w-48 dark:bg-[#171717] z-20"
          >
            <Link
              href="/profile"
              className="block flex px-3 py-2 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Bell className="h-4 w-4 mt-0.5 mr-4" />
              <div className="flex flex-col">
                <span className="truncate">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </Link>
            <hr />
            <Link
              href="/profile"
              className="block flex px-3 py-2 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Bell className="h-4 w-4 mt-0.5 mr-4" />
              Notification
            </Link>
            <Link
              href="/profile"
              className="block flex px-3 py-2 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Settings className="h-4 w-4 mt-0.5 mr-4" />
              Setting
            </Link>
            <hr />
            <Link
              href="/help"
              className="block flex px-3 py-2 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Info className="h-4 w-4 mt-0.5 mr-4" />
              Help
            </Link>
            <hr />
            <button className="block px-3 flex w-full py-2 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700">
              <LogOut className="h-4 w-4 mt-0.5 mr-4" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
