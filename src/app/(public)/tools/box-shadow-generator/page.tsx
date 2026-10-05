import ToolLayout from "@/components/Public/Tools/ToolLayout";
import BoxShadowGenerator from "@/components/Public/Tools/BoxShadowGenerator/BoxShadowGenerator";

export default function BoxShadowGeneratorPage() {
  return (
    <ToolLayout
      title="Box Shadow Generator"
      description="Create layered CSS shadows with a real-time preview and ready-made presets."
    >
      <BoxShadowGenerator />
    </ToolLayout>
  );
}
