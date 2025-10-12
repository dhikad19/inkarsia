// /app/palette/page.tsx
import React from "react";
import PaletteGrid from "@/components/Public/Tools/PaletteGenerator/PaletteGrid";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <PaletteGrid initialCount={5} />
        <footer className="mt-12 text-sm text-slate-500 text-center">
          Built with Tailwind + shadcn-style utilities • drag & drop by @dnd-kit
          • name detection via color-namer.
        </footer>
      </div>
    </main>
  );
}
