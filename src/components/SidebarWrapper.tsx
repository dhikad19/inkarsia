"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navigation";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // mobile toggle
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop collapse

  return (
    <>
      <Sidebar isOpen={sidebarOpen} isCollapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onCollapseSidebar={() => setSidebarCollapsed((prev) => !prev)}
        />

        <main className="flex-1 p-6 bg-white dark:bg-[#0a0a0a]">
          {children}
        </main>
      </div>
    </>
  );
}
