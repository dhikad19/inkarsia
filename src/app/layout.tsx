"use client";
import "./globals.css";
import { Merriweather } from "next/font/google";
import { useState } from "react";
import Providers from "./providers";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navigation";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // mobile show/hide
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop collapse

  return (
    <html lang="en">
      <body className={`${merriweather.className} min-h-screen flex`}>
        <Providers>
          <Sidebar isOpen={sidebarOpen} isCollapsed={sidebarCollapsed} />

          <div className="flex-1 flex flex-col min-h-screen">
            <Navbar
              onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
              onCollapseSidebar={() => setSidebarCollapsed((prev) => !prev)}
            />

            <main className="flex-1 p-6 bg-white dark:bg-gray-950">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
