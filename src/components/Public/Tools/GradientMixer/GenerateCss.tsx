"use client";
import React from "react";
import { GradientState } from "@/lib/types";
import { makeGradientCss } from "@/lib/gradient";

export default function GeneratedCss({ state }: { state: GradientState }) {
  const css = makeGradientCss(state);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      alert("Copied CSS!");
    } catch {
      alert("Copy failed");
    }
  };

  const share = async () => {
    try {
      const url = `${window.location.origin}${
        window.location.pathname
      }?g=${encodeURIComponent(JSON.stringify(state))}`;
      if (navigator.share) {
        await navigator.share({
          title: "Gradient",
          text: "Check this gradient",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Share URL copied");
      }
    } catch (e) {
      console.error(e);
      alert("Share failed");
    }
  };

  return (
    <div className="panel bg-slate-800 rounded-lg p-4">
      <div className="text-sm font-medium mb-2">Generated CSS</div>
      <pre className="bg-black/50 p-3 rounded text-xs whitespace-pre-wrap">
        {css}
      </pre>
      <div className="flex gap-2 mt-3">
        <button onClick={copy} className="px-3 py-1 rounded bg-indigo-600">
          Copy CSS
        </button>
        <button onClick={share} className="px-3 py-1 rounded bg-emerald-600">
          Share Gradient
        </button>
      </div>
    </div>
  );
}
