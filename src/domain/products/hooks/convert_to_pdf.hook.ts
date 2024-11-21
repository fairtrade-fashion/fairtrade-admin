import { useState } from "react";

interface Base64File {
  file: string;
}

export const useBase64Files = () => {
  const [base64Files, setBase64Files] = useState<Base64File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const convertFilesToBase64 = async (files: { file: File }[]) => {
    if (files.length === 0) return [];

    setIsLoading(true);
    setError(null);

    try {
      const base64Results = await Promise.all(
        files.map((file) => {
          return new Promise<Base64File>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.file);
            reader.onload = () => resolve({ file: reader.result as string });
            reader.onerror = (error) => reject(error);
          });
        })
      );

      setBase64Files(base64Results);
      return base64Results;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const resetFiles = () => {
    setBase64Files([]);
    setError(null);
  };

  return {
    base64Files,
    convertFilesToBase64,
    isLoading,
    error,
    resetFiles,
  };
};
