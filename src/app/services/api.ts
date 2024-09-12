import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { fetchToken } from "@/config/token";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = fetchToken("access_token");
    console.log("Fetched Token:", token);
    const authHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    Object.entries(authHeaders).forEach(([key, value]) => {
      headers.set(key, value as string);
    });
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });
export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Category", "Color", "Size", "Products"],
  endpoints: () => ({}),
});
