"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navigation";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar isOpen={sidebarOpen} isCollapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onCollapseSidebar={() => setSidebarCollapsed((prev) => !prev)}
        />

        <main className="flex-1 p-6 overflow-y-auto bg-white dark:bg-[#0a0a0a]">
          {children}
        </main>
      </div>
    </div>
  );
}
