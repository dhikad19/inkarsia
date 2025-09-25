"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Sun, User, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { NavigationMenuDropdown } from "./Menu";

export default function PublicHeader() {
  const { setTheme } = useTheme();

  return (
    <header className="w-full border-b bg-white dark:bg-[#0a0a0a]">
      <nav className="mx-auto flex justify-between items-center py-3 px-6">
        <h1 className="text-lg font-bold">My UI/UX Site</h1>

        <NavigationMenuDropdown />

        <div className="hidden md:flex items-center gap-4">
          {/* Theme toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-5 w-5 dark:hidden" />
                <Moon className="h-5 w-5 hidden dark:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Login</DropdownMenuItem>
              <DropdownMenuItem>Register</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-4 mt-6">
                <h2 className="text-lg font-bold">Menu</h2>
                <Button variant="ghost" className="justify-start">
                  Home
                </Button>
                <Button variant="ghost" className="justify-start">
                  About
                </Button>
                <Button variant="ghost" className="justify-start">
                  Blog
                </Button>
                <Button variant="ghost" className="justify-start">
                  Contact
                </Button>

                <div className="border-t pt-4 mt-4 flex flex-col gap-2">
                  <Button variant="outline" onClick={() => setTheme("light")}>
                    Light
                  </Button>
                  <Button variant="outline" onClick={() => setTheme("dark")}>
                    Dark
                  </Button>
                  <Button variant="outline" onClick={() => setTheme("system")}>
                    System
                  </Button>
                </div>

                <div className="border-t pt-4 mt-4 flex flex-col gap-2">
                  <Button variant="default">Login</Button>
                  <Button variant="secondary">Register</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
