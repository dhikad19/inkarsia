import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ContainerProperties({
  properties,
  setProperties,
}: any) {
  const handleChange = (key: string, value: string) => {
    setProperties((prev: any) => ({ ...prev, [key]: value }));
  };

  const options = {
    flexDirection: ["row", "row-reverse", "column", "column-reverse"],
    flexWrap: ["nowrap", "wrap", "wrap-reverse"],
    justifyContent: [
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "space-evenly",
    ],
    alignItems: ["stretch", "flex-start", "flex-end", "center", "baseline"],
    alignContent: [
      "normal",
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "stretch",
    ],
    gap: ["0px", "4px", "8px", "10px", "16px", "24px"],
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {Object.keys(options).map((key) => (
        <div key={key}>
          <Label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Label>
          <Select
            value={properties[key]}
            onValueChange={(val) => handleChange(key, val)}
          >
            <SelectTrigger className="mt-1 bg-[#1b1b1b] border-neutral-700 text-white">
              <SelectValue placeholder={properties[key]} />
            </SelectTrigger>
            <SelectContent className="bg-[#1b1b1b] border-neutral-700 text-white">
              {options[key as keyof typeof options].map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
