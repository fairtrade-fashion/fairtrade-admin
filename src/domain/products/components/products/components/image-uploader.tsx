import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/button";
import { ImageData } from "./types/product-types";

interface ImageUploaderProps {
  onImagesChange: (files: File[]) => void;
  existingImages?: ImageData[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesChange,
  existingImages = [],
}) => {
  const [uploadedImages, setUploadedImages] = useState<
    { id: number | string; file?: File; preview: string }[]
  >([]);

  useEffect(() => {
    setUploadedImages(
      existingImages.map((img) => ({
        id: img.id,
        preview: img.url,
      }))
    );
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
      }));

      setUploadedImages((prev) => {
        const updatedImages = [...prev, ...newImages];
        console.log("updatedImages::: ", updatedImages);
        onImagesChange(
          updatedImages.filter((img) => img.file).map((img) => img.file!)
        );
        return updatedImages;
      });
    },
    [onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeImage = (id: number | string) => {
    setUploadedImages((prev) => {
      const newImages = prev.filter((img) => img.id !== id);
      onImagesChange(
        newImages.filter((img) => img.file).map((img) => img.file!)
      );
      return newImages;
    });
  };

  React.useEffect(() => {
    return () => {
      uploadedImages.forEach((img) => {
        if (img.file) URL.revokeObjectURL(img.preview);
      });
      console.log("uploadedImages::: ", uploadedImages);
    };
  }, [uploadedImages]);

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop images here, or click to select files"}
        </p>
      </div>

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.preview}
                alt="Uploaded preview"
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(image.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
