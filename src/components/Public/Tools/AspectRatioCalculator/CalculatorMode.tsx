"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  mode: "calculate" | "scale" | "find";
  onChangeMode: (m: "calculate" | "scale" | "find") => void;
};

export default function CalculatorMode({ mode, onChangeMode }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm font-medium mr-2">Calculator Mode</span>
      <div className="flex gap-2">
        <Button
          variant={mode === "calculate" ? "default" : "ghost"}
          onClick={() => onChangeMode("calculate")}
        >
          Calculate Ratio
        </Button>
        <Button
          variant={mode === "scale" ? "default" : "ghost"}
          onClick={() => onChangeMode("scale")}
        >
          Scale Dimensions
        </Button>
        <Button
          variant={mode === "find" ? "default" : "ghost"}
          onClick={() => onChangeMode("find")}
        >
          Find Dimension
        </Button>
      </div>
    </div>
  );
}
