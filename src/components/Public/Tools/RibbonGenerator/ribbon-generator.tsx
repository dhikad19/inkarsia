"use client";

import { RibbonConfig } from "./ribbon-types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  config: RibbonConfig;
  setConfig: (c: RibbonConfig) => void;
}

export default function RibbonGenerator({ config, setConfig }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label>Ribbon Style</label>

        <Select
          value={config.style}
          onValueChange={(v) => setConfig({ ...config, style: v as any })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="flat">Flat</SelectItem>
            <SelectItem value="fold">Folded</SelectItem>
            <SelectItem value="shadow">Shadow</SelectItem>
            <SelectItem value="stitched">Stitched</SelectItem>
            <SelectItem value="double">Double Layer</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label>Ribbon Text</label>

        <Input
          value={config.text}
          onChange={(e) => setConfig({ ...config, text: e.target.value })}
        />
      </div>

      <div>
        <label>Color</label>

        <Input
          type="color"
          value={config.color}
          onChange={(e) => setConfig({ ...config, color: e.target.value })}
        />
      </div>

      <div>
        <label>Height</label>

        <Input
          type="number"
          value={config.height}
          onChange={(e) =>
            setConfig({ ...config, height: Number(e.target.value) })
          }
        />
      </div>
    </div>
  );
}
