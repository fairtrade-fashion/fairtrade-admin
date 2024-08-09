import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { fetchToken } from "@/config/token";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = fetchToken("access_token");
    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });
export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: [],
  endpoints: () => ({}),
});
