import ColorContrastChecker from "@/components/Public/Tools/ColorContrastChecker/ColorContrast";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">
        Color Contrast Checker
      </h1>
      <p className="text-center text-gray-500 mb-10">
        Calculate the contrast ratio of text and background colors.
      </p>
      <ColorContrastChecker />
    </main>
  );
}
