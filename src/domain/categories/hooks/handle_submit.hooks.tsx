import { useCallback } from "react";
import { toast } from "sonner";

// Assuming FetchBaseQueryError is already imported or defined elsewhere
interface FetchBaseQueryError {
  status: number;
  data?: {
    message?: string;
  };
}

const useErrorHandler = () => {
  const handleError = useCallback((error: unknown) => {
    if (typeof error === "object" && error !== null) {
      if ("status" in error) {
        const fetchError = error as FetchBaseQueryError;
        if (
          typeof fetchError.data === "object" &&
          fetchError.data !== null &&
          "message" in fetchError.data
        ) {
          toast.error(fetchError.data.message as string);
        } else {
          toast.error("An error occurred during the operation.");
        }
      } else if ("message" in error) {
        toast.error((error as Error).message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }, []);

  return handleError;
};

export default useErrorHandler;
