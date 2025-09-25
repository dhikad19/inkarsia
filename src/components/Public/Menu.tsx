"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function NavigationMenuDropdown() {
  return (
    <nav className="flex items-center gap-4">
      <Link href="/" className="text-sm font-medium hover:underline">
        Home
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-sm font-medium flex items-center gap-1"
          >
            Components
            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>UI Components</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/docs/alert-dialog">Alert Dialog</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/docs/hover-card">Hover Card</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/docs/progress">Progress</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/docs/scroll-area">Scroll Area</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
