import ToolLayout from "@/components/Public/Tools/ToolLayout";
import { BorderRadiusCalculator } from "@/components/Public/Tools/BorderRadiusFixer/BorderRadiusCalculator";

export default function BorderRadiusPage() {
  return (
    <ToolLayout
      title="Border Radius Fixer"
      description="Find the matching border-radius between parent and child elements for smooth, consistent curves."
    >
      <BorderRadiusCalculator />
    </ToolLayout>
  );
}
