import { Button } from "@/components/ui/button";

export default function DownloadResult({ url, format }: any) {
  return (
    <div className="text-center mt-6 space-y-3">
      <p className="text-sm text-neutral-400">Your image is ready!</p>
      <img
        src={url}
        alt="converted"
        className="max-h-48 mx-auto border border-neutral-700 rounded-lg"
      />
      <div>
        <a href={url} download={`converted.${format}`}>
          <Button variant="outline">Download {format.toUpperCase()}</Button>
        </a>
      </div>
    </div>
  );
}
