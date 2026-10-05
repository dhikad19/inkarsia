import ToolLayout from "@/components/Public/Tools/ToolLayout";
import BorderRadiusPlayground from "@/components/Public/Tools/BorderRadiusPlayground/BorderRadiusPlayground";

export default function Page() {
  return (
    <ToolLayout
      title="Border Radius Playground"
      description="Create organic CSS border-radius shapes with individual control over every corner."
    >
      <BorderRadiusPlayground />
    </ToolLayout>
  );
}
