export interface ErrorState {
  message: string;
  error: string;
  statusCode: number;
}

export function isErrorState(error: unknown): error is ErrorState {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "error" in error &&
    "statusCode" in error &&
    typeof error.message === "string" &&
    typeof error.error === "string" &&
    typeof error.statusCode === "number"
  );
}
