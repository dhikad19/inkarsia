import { Button } from "@/components/ui/button";

export default function FlexContainer({
  items,
  properties,
  onAdd,
  onRemove,
  onReset,
}: any) {
  return (
    <div>
      <div className="flex justify-between mb-3">
        <div className="font-medium">Flex Container</div>
        <div className="space-x-2">
          <Button size="sm" onClick={onAdd}>
            Add Item
          </Button>
          <Button size="sm" variant="outline" onClick={onRemove}>
            Remove Item
          </Button>
          <Button size="sm" variant="destructive" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>

      <div
        className="border border-dashed border-neutral-600 p-4 min-h-[120px] rounded-lg transition-all"
        style={{
          display: "flex",
          flexDirection: properties.flexDirection,
          flexWrap: properties.flexWrap,
          justifyContent: properties.justifyContent,
          alignItems: properties.alignItems,
          alignContent: properties.alignContent,
          gap: properties.gap,
        }}
      >
        {items.map((num) => (
          <div
            key={num}
            className="bg-white text-black font-semibold rounded-lg w-12 h-20 flex items-center justify-center"
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}
