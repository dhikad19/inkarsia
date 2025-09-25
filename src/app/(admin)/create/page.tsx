"use client";

import { useState, useRef } from "react";

interface Block {
  id: number;
  content: string;
}

export default function MediumBlocksEditor() {
  const [blocks, setBlocks] = useState<Block[]>([{ id: 1, content: "" }]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const handleInput = (id: number, target: HTMLDivElement) => {
    const html = target.innerHTML;
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content: html } : b))
    );
  };

  const setCaretToEnd = (el: HTMLDivElement) => {
    if (!el) return;
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false); // false = caret di akhir
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        e.stopPropagation();
        return;
      }

      e.preventDefault();

      const currentElement = e.currentTarget;
      const html = currentElement.innerHTML;

      // Simpan isi blok aktif dulu
      setBlocks((prev) => {
        const newId = Math.max(...prev.map((b) => b.id)) + 1;
        const index = prev.findIndex((b) => b.id === id);
        const newBlock: Block = { id: newId, content: "" };

        const updated = [...prev];
        updated[index] = { ...updated[index], content: html }; // Update isi block lama
        updated.splice(index + 1, 0, newBlock); // Sisipkan block baru

        return updated;
      });

      setTimeout(() => {
        const el = document.getElementById(
          `block-${id + 1}`
        ) as HTMLDivElement | null;
        el?.focus();
        el && setCaretToEnd(el);
      }, 0);
    }
  };

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const formatText = (command: string) => {
    document.execCommand(command, false);
    setActiveMenu(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-2">
      {blocks.map((block) => (
        <div key={block.id} className="flex items-start space-x-2 relative">
          <button
            onClick={() => toggleMenu(block.id)}
            className="w-6 h-6 text-gray-500 hover:bg-gray-200 rounded flex items-center justify-center"
          >
            +
          </button>

          {/* Editable block */}
          <div
            id={`block-${block.id}`}
            contentEditable
            suppressContentEditableWarning
            className="prose prose-lg sm:prose-xl p-2 border rounded min-h-[40px] flex-1 focus:outline-none"
            onKeyDown={(e) => handleKeyDown(e, block.id)}
            onBlur={(e) => handleInput(block.id, e.currentTarget)}
            dangerouslySetInnerHTML={{ __html: block.content }}
          ></div>

          {/* Inline menu */}
          {activeMenu === block.id && (
            <div className="absolute left-8 top-0 flex space-x-2 bg-gray-100 p-2 rounded shadow z-50">
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  formatText("bold");
                }}
                className="font-bold"
              >
                B
              </button>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  formatText("italic");
                }}
                className="italic"
              >
                I
              </button>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  formatText("underline");
                }}
                className="underline"
              >
                U
              </button>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  formatText("insertOrderedList");
                }}
              >
                OL
              </button>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  formatText("insertUnorderedList");
                }}
              >
                UL
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
