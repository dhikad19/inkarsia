"use client";

import Editor from "@monaco-editor/react";
import { JsonStatus } from "./JsonStatus";

export function JsonOutputViewer({
  value,
  error,
  stats,
}: {
  value: string;
  error?: { line: number; message: string };
  stats: any;
}) {
  if (!value.trim()) return null;

  return (
    <div className="border rounded-md overflow-hidden space-y-2 p-2">
      <JsonStatus {...stats} />

      <Editor
        height="400px"
        language="json"
        value={value}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          folding: true,
          lineNumbers: "on",
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        onMount={(editor, monaco) => {
          if (!editor.getModel()) return;

          monaco.editor.setModelMarkers(
            editor.getModel()!,
            "json",
            error
              ? [
                  {
                    startLineNumber: error.line,
                    startColumn: 1,
                    endLineNumber: error.line,
                    endColumn: 100,
                    message: error.message,
                    severity: monaco.MarkerSeverity.Error,
                  },
                ]
              : [],
          );
        }}
      />
    </div>
  );
}
