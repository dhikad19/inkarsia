"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { useState } from "react";

export default function MediumEditor() {
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder: ({ node }) =>
          node.type.name === "heading" ? "Title" : "Tell your story…",
      }),
    ],
    immediatelyRender: false,
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg sm:prose-xl mx-auto p-4 focus:outline-none min-h-[500px]",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <input
        type="text"
        placeholder="Title"
        className="w-full text-3xl font-bold border-b-2 border-gray-200 p-2 mb-4 focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <FloatingMenu
        editor={editor}
        className="flex bg-gray-100 p-2 rounded shadow space-x-2"
      >
        <button
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            editor.commands.blur();
          }}
        >
          B
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
            editor.commands.blur();
          }}
        >
          I
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
            editor.commands.blur();
          }}
        >
          H2
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
            editor.commands.blur();
          }}
        >
          ❝ ❞
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
            editor.commands.blur();
          }}
        >
          🔗
        </button>
      </FloatingMenu>

      <EditorContent editor={editor} />
    </div>
  );
}
