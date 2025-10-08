import { Button } from "@/components/ui/button";

export default function PresetLayouts({ setProperties }: any) {
  const presets = {
    Center: {
      justifyContent: "center",
      alignItems: "center",
    },
    "Space Between": {
      justifyContent: "space-between",
    },
    Column: {
      flexDirection: "column",
      alignItems: "center",
    },
    Wrap: {
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
  };

  return (
    <div>
      <div className="font-medium mb-2">Preset Layouts</div>
      <div className="flex gap-2 flex-wrap">
        {Object.keys(presets).map((name) => (
          <Button
            key={name}
            variant="outline"
            size="sm"
            onClick={() =>
              setProperties((prev: any) => ({
                ...prev,
                ...presets[name as keyof typeof presets],
              }))
            }
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}
