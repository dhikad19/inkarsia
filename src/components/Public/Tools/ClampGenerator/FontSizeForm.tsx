"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  minFont: number;
  setMinFont: (v: number) => void;
  maxFont: number;
  setMaxFont: (v: number) => void;
  minWidth: number;
  setMinWidth: (v: number) => void;
  maxWidth: number;
  setMaxWidth: (v: number) => void;
  unit: string;
  setUnit: (v: string) => void;
  precision: number;
  setPrecision: (v: number) => void;
};

export default function FontSizeForm(props: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border p-4 rounded-lg">
      <div>
        <Label>Min font size</Label>
        <Input
          type="number"
          step="0.01"
          value={props.minFont}
          onChange={(e) => props.setMinFont(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <Label>Max font size</Label>
        <Input
          type="number"
          step="0.01"
          value={props.maxFont}
          onChange={(e) => props.setMaxFont(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <Label>Font unit</Label>
        <Select value={props.unit} onValueChange={props.setUnit}>
          <SelectTrigger>
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rem">rem</SelectItem>
            <SelectItem value="em">em</SelectItem>
            <SelectItem value="px">px</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Min viewport width (px)</Label>
        <Input
          type="number"
          value={props.minWidth}
          onChange={(e) => props.setMinWidth(parseInt(e.target.value))}
        />
      </div>
      <div>
        <Label>Max viewport width (px)</Label>
        <Input
          type="number"
          value={props.maxWidth}
          onChange={(e) => props.setMaxWidth(parseInt(e.target.value))}
        />
      </div>
      <div>
        <Label>Precision</Label>
        <Input
          type="number"
          value={props.precision}
          onChange={(e) => props.setPrecision(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}
