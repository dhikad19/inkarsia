import { Button } from "@/components/ui/button";

export default function ConverterPanel({ setImageFile }: any) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
        id="upload"
      />
      <label htmlFor="upload">
        <Button asChild>
          <span>Upload Image</span>
        </Button>
      </label>
    </div>
  );
}
