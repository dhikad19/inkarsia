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
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

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
        "bg-background sticky top-0 border-r border-border h-screen flex flex-col transition-all duration-300",
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
            <div className="ml-3 mb-0.5">
              <h4 className="text-md font-bold leading-none mt-1 mb-0">
                Morials Project
              </h4>
              <div className="text-sm mt-0.5 text-muted-foreground">Sketch</div>
            </div>
          )}
        </div>
        {!isCollapsed && <ChevronsUpDown className="w-4 h-4" />}
      </div>

      <nav
        className={`flex-1 p-2 overflow-y-auto overflow-x-hidden transition duration-0 ${
          !isCollapsed ? "space-y-4" : ""
        }`}
      >
        {menuGroups.map((group) => (
          <div key={group.title}>
            <Collapsible open={!isCollapsed}>
              <CollapsibleContent>
                <div className="px-3 py-1 text-sm font-medium text-muted-foreground">
                  {group.title}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {group.items.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleGroup(item.label)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-accent"
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
                    <div className="ml-6 mt-1 space-y-1 border-l border-border">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-3 py-2 rounded text-sm hover:bg-accent ml-2"
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
                  className="relative flex items-center px-3 py-2 rounded hover:bg-accent transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5 shrink-0" />

                  <span
                    className={clsx(
                      "ml-3 text-sm font-medium transition-all duration-300",
                      isCollapsed
                        ? "opacity-0 translate-x-2 pointer-events-none"
                        : "opacity-100 translate-x-0"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            )}
          </div>
        ))}
      </nav>

      <div className="p-2 border-t border-border relative">
        <button
          ref={buttonRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={clsx(
            "flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-accent",
            isDropdownOpen && "bg-accent"
          )}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </button>

        {isDropdownOpen && (
          <div
            style={{ borderRadius: "7px" }}
            ref={panelRef}
            className="absolute rounded-xl border shadow-md border-border left-full bottom-0 mb-4 ml-0 w-48 bg-background z-20"
          >
            <Link
              href="/profile"
              className="block flex px-3 py-2 rounded text-sm hover:bg-accent"
            >
              <Bell className="h-4 w-4 mt-0.5 mr-4" />
              <div className="flex flex-col">
                <span className="truncate">{user.username}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </Link>
            <hr className="border-border" />
            <Link
              href="/profile"
              className="block flex px-3 py-2 rounded text-sm hover:bg-accent"
            >
              <Bell className="h-4 w-4 mt-0.5 mr-4" />
              Notification
            </Link>
            <Link
              href="/profile"
              className="block flex px-3 py-2 rounded text-sm hover:bg-accent"
            >
              <Settings className="h-4 w-4 mt-0.5 mr-4" />
              Setting
            </Link>
            <hr className="border-border" />
            <Link
              href="/help"
              className="block flex px-3 py-2 rounded text-sm hover:bg-accent"
            >
              <Info className="h-4 w-4 mt-0.5 mr-4" />
              Help
            </Link>
            <hr className="border-border" />
            <button className="block px-3 flex w-full py-2 rounded text-sm hover:bg-accent">
              <LogOut className="h-4 w-4 mt-0.5 mr-4" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
