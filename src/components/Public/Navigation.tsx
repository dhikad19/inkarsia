"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Moon, Sun, Menu, Monitor, Check, X, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationMenuDropdown } from "./Menu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
];

const themeOptions: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

export default function PublicHeader() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md dark:bg-[#0a0a0a]/80">
      <nav className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-20">
        {/* Logo */}
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Rackit home"
          >
            <Image
              src="/assets/logo-very-small-black.svg"
              alt=""
              width={26}
              height={26}
              unoptimized
              className="dark:hidden"
            />
            <Image
              src="/assets/logo-very-small-white.svg"
              alt=""
              width={26}
              height={26}
              unoptimized
              className="hidden dark:block"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden flex-1 justify-center md:flex">
          <NavigationMenuDropdown />
        </div>

        {/* Desktop actions */}
        <div className="hidden flex-1 items-center justify-end gap-2 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Change theme">
                <Sun className="h-[18px] w-[18px] dark:hidden" />
                <Moon className="hidden h-[18px] w-[18px] dark:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => setTheme(value)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {theme === value && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu */}
        <div className="flex flex-1 justify-end md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 p-0 [&>button:not([data-custom-close])]:hidden"
            >
              <SheetClose asChild>
                <Button
                  data-custom-close
                  variant="outline"
                  size="icon"
                  aria-label="Close menu"
                  className="absolute right-4 top-3.5 sm:right-6"
                >
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>

              <SheetHeader className="flex h-16 flex-col justify-center space-y-0 border-b px-6 py-0 text-left">
                <SheetTitle className="text-base">Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 p-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mx-3 border-t pt-4">
                <p className="mb-2 px-3 text-xs font-medium tracking-wide text-muted-foreground">
                  Theme
                </p>
                <div className="grid grid-cols-3 gap-2 px-3">
                  {themeOptions.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setTheme(value)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-lg border py-2.5 text-xs font-medium transition-colors",
                        theme === value
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
