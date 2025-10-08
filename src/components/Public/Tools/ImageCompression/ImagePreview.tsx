export default function ImagePreview({ imageFile }: any) {
  const url = URL.createObjectURL(imageFile);

  return (
    <div className="flex justify-center">
      <img
        src={url}
        alt="preview"
        className="max-h-64 object-contain rounded-lg border border-neutral-700"
      />
    </div>
  );
}
