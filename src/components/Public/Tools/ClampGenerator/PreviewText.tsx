"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function PreviewText({ css }: { css: string }) {
  const [text, setText] = useState(
    "Make type scale with viewport, safely. Try me—edit this text."
  );

  return (
    <Card className="p-4">
      <textarea
        className="w-full bg-transparent resize-none outline-none"
        style={{ fontSize: css.replace("font-size: ", "").replace(";", "") }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Card>
  );
}
