import { BorderRadiusCalculator } from "@/components/Public/Tools/BorderRadiusFixer/BorderRadiusCalculator";

export default function BorderRadiusPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          Border Radius Harmony Calculator
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Find the perfect matching border-radius between parent and child
          elements for smooth, consistent curves.
        </p>
        <BorderRadiusCalculator />
      </div>
    </main>
  );
}
