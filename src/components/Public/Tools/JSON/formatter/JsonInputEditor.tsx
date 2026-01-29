"use client";

import Editor from "@monaco-editor/react";

export function JsonInputEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border rounded-md overflow-hidden">
      <Editor
        height="260px"
        language="json"
        value={value}
        options={{
          minimap: { enabled: false },
          wordWrap: "on",
          lineNumbers: "on",
          folding: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        onChange={(val) => onChange(val ?? "")}
      />
    </div>
  );
}
