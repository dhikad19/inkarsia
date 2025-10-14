"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadiusInputs } from "./RadiusInput";
import { RadiusPreview } from "./RadiusPreview";

export function BorderRadiusCalculator() {
  const [parentRadius, setParentRadius] = useState(24);
  const [padding, setPadding] = useState(16);
  const [childRadius, setChildRadius] = useState(12);

  // 🔹 Formula dua arah:
  const suggestedChild = Math.max(0, parentRadius - padding / 2);
  const suggestedParent = childRadius + padding / 2;

  // 🔹 Fungsi untuk auto adjust
  const adjustChild = () => setChildRadius(suggestedChild);
  const adjustParent = () => setParentRadius(suggestedParent);

  return (
    <Card className="shadow-lg border border-gray-200 rounded-2xl">
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <RadiusInputs
            id="parentRadius"
            label="Parent Border Radius (px)"
            value={parentRadius}
            onChange={setParentRadius}
          />

          <RadiusInputs
            id="padding"
            label="Inner Padding (px)"
            value={padding}
            onChange={setPadding}
          />

          <RadiusInputs
            id="childRadius"
            label="Child Border Radius (px)"
            value={childRadius}
            onChange={setChildRadius}
          />
        </div>

        {/* Hasil perhitungan */}
        <div className="text-center border-t pt-4 space-y-2">
          <p className="text-gray-600 text-sm mb-1">
            🎯 Suggested matching values
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div>
              <p className="text-sm text-gray-500">For Child</p>
              <p className="text-lg font-semibold text-indigo-600">
                {suggestedChild.toFixed(1)} px
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">For Parent</p>
              <p className="text-lg font-semibold text-indigo-600">
                {suggestedParent.toFixed(1)} px
              </p>
            </div>
          </div>
        </div>

        {/* Tombol aksi */}
        <div className="flex justify-center gap-3 mt-4">
          <Button
            onClick={adjustChild}
            variant="default"
            className="rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Adjust Child Radius
          </Button>
          <Button
            onClick={adjustParent}
            variant="secondary"
            className="rounded-xl"
          >
            Adjust Parent Radius
          </Button>
        </div>

        {/* Preview */}
        <RadiusPreview
          parentRadius={parentRadius}
          padding={padding}
          childRadius={childRadius}
        />
      </CardContent>
    </Card>
  );
}
