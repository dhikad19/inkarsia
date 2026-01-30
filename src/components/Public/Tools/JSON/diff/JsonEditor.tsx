"use client";

import Editor from "@monaco-editor/react";
import { useRef } from "react";

export function JsonEditor({ value, onChange, onMount }: any) {
  return (
    <Editor
      height="400px"
      defaultLanguage="json"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      onMount={onMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
}
