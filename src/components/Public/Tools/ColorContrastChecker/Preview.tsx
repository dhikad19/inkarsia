interface Props {
  fg: string;
  bg: string;
}

export default function Preview({ fg, bg }: Props) {
  return (
    <div
      className="p-6 rounded-lg border mt-4"
      style={{ color: fg, backgroundColor: bg }}
    >
      <h3 className="text-lg font-medium">Sample Text</h3>
      <p className="text-sm opacity-80">This is how your text will look.</p>
    </div>
  );
}
