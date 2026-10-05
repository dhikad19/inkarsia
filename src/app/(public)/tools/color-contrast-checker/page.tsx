import ToolLayout from "@/components/Public/Tools/ToolLayout";
import ColorContrastChecker from "@/components/Public/Tools/ColorContrastChecker/ColorContrast";

export default function Page() {
  return (
    <ToolLayout
      title="Color Contrast Checker"
      description="Calculate the contrast ratio between text and background colors and check it against WCAG 2.1.">
      <ColorContrastChecker />
    </ToolLayout>
  );
}
