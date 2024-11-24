import React from "react";

interface ImageUploaderProps {
  onChange: (urls: string[]) => void;
  imageUrls: string[];
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  imageUrls,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file)); // Generates temporary URLs for previews
    onChange([...imageUrls, ...urls]);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Upload Images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm border rounded p-2"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded preview ${index}`}
            className="h-20 w-20 object-cover border rounded"
          />
        ))}
      </div>
    </div>
  );
};
