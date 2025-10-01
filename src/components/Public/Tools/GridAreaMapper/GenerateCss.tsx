import React from "react";
import { Area } from "@/utils/types";

interface GeneratedCssProps {
  css: string;
  areas: Area[];
}

export function GeneratedCss({ css, areas }: GeneratedCssProps) {
  const copyCss = () => {
    navigator.clipboard.writeText(css);
  };

  const copyHtml = () => {
    const htmlTemplate = `
<div class="grid-container">
${areas.map((a) => `  <div class="${a.name}">${a.name}</div>`).join("\n")}
</div>
`;
    navigator.clipboard.writeText(htmlTemplate);
  };

  const shareLayout = async () => {
    try {
      await navigator.share({
        title: "Grid Layout",
        text: "Check out my CSS Grid layout!",
        url: window.location.href,
      });
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Generated CSS</h2>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm whitespace-pre-wrap overflow-x-auto">
        {css}
      </pre>
      <div className="flex gap-2 mt-2">
        <button
          onClick={copyCss}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Copy CSS
        </button>
        <button
          onClick={copyHtml}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
        >
          Copy HTML
        </button>
        <button
          onClick={shareLayout}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          Share Layout
        </button>
      </div>
    </div>
  );
}
