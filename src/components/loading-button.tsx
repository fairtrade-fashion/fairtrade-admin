import { Button } from "@/components/button";
import { LoaderCircle } from "lucide-react";

type LoadingButtonProp = {
  loading: boolean;
  children: string;
  type?: "submit" | "button";
};
export default function LoadingButton({
  loading,
  children,
  type,
}: LoadingButtonProp) {
  return (
    <Button
      type={type}
      disabled={loading}
      data-loading={loading}
      className="group relative disabled:opacity-100"
    >
      <span className="group-data-[loading=true]:text-transparent">
        {children}
      </span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircle
            className="animate-spin"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      )}
    </Button>
  );
}
