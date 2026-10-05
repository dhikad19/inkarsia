"use client";

import { useEffect, useState } from "react";
import { Expand, X } from "lucide-react";

type Props = { textColor: string; bgColor: string };

function Sample({ large }: { large?: boolean }) {
  return (
    <div className="max-w-xl space-y-3 text-center">
      <h2
        className={large ? "text-4xl font-semibold" : "text-xl font-semibold"}>
        Quote n. 16
      </h2>
      <p className={large ? "text-xl" : "text-sm"}>
        Even if you’re on the right track, you’ll get run over if you just sit
        there.
      </p>
      <p className={large ? "text-lg font-bold" : "text-sm font-bold"}>
        Will Rogers
      </p>
    </div>
  );
}

export default function ColorPreview({ textColor, bgColor }: Props) {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setFullscreen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [fullscreen]);

  return (
    <>
      <div
        className="relative flex min-h-72 items-center justify-center rounded-xl border p-8 transition-colors"
        style={{ backgroundColor: bgColor, color: textColor }}>
        <button
          type="button"
          onClick={() => setFullscreen(true)}
          aria-label="Expand preview"
          className="absolute right-3 top-3 rounded-lg border border-current/30 p-2 opacity-70 transition-opacity hover:opacity-100">
          <Expand className="h-4 w-4" />
        </button>
        <Sample />
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-8"
          style={{ backgroundColor: bgColor, color: textColor }}>
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            aria-label="Close preview"
            className="absolute right-4 top-4 rounded-lg border border-current/30 p-2 opacity-70 transition-opacity hover:opacity-100">
            <X className="h-5 w-5" />
          </button>
          <Sample large />
        </div>
      )}
    </>
  );
}
