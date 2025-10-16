"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background text-muted-foreground mt-16">
      <div className="mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="text-lg font-semibold text-foreground">
              Inkarsa Studio
            </Link>
            <p className="text-sm mt-1">
              Empowering design, accessibility, and intelligence.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </Link>

            {/* Optional Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom credit */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground/80 gap-2">
          <p>© {year} Inkarsa. All rights reserved.</p>
          <p>
            Made with ❤️ using{" "}
            <span className="font-medium text-foreground">Next.js</span> +{" "}
            <span className="font-medium text-foreground">shadcn/ui</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
