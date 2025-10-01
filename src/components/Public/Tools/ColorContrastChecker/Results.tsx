interface Props {
  ratio: number;
  normal: string;
  large: string;
  enhanced: string;
}

export default function Results({ ratio, normal, large, enhanced }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      <div className="rounded-lg border p-4 text-center">
        <h4 className="font-semibold">Contrast Ratio</h4>
        <p className="text-xl">{ratio}:1</p>
      </div>
      <div className="rounded-lg border p-4 text-center">
        <h4 className="font-semibold">Normal Text</h4>
        <p>{normal}</p>
      </div>
      <div className="rounded-lg border p-4 text-center">
        <h4 className="font-semibold">Large Text</h4>
        <p>{large}</p>
      </div>
      <div className="rounded-lg border p-4 text-center">
        <h4 className="font-semibold">Enhanced</h4>
        <p>{enhanced}</p>
      </div>
    </div>
  );
}
