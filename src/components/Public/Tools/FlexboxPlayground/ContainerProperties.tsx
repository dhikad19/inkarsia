"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  OPTIONS,
  toCssProp,
  type FlexProperties,
  type FlexPropertyKey,
} from "./utils";

type Props = {
  properties: FlexProperties;
  onChange: <K extends FlexPropertyKey>(
    key: K,
    value: FlexProperties[K],
  ) => void;
};

export default function ContainerProperties({ properties, onChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Properties</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {(Object.keys(OPTIONS) as FlexPropertyKey[]).map((key) => {
          // align-content tidak berpengaruh kalau tidak ada multi-line
          const disabled =
            key === "alignContent" && properties.flexWrap === "nowrap";

          return (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={key} className="font-mono text-xs">
                {toCssProp(key)}
              </Label>
              <Select
                value={properties[key]}
                disabled={disabled}
                onValueChange={(val) =>
                  onChange(key, val as FlexProperties[typeof key])
                }>
                <SelectTrigger id={key} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OPTIONS[key].map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {disabled && (
                <p className="text-xs text-muted-foreground">
                  Only applies when flex-wrap is not nowrap.
                </p>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
