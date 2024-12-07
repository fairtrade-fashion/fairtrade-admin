import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { fetchToken } from "@/config/token";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  // credentials: "include",
  prepareHeaders: (headers) => {
    const token = fetchToken("access_token");
    console.log("Fetched Token:", token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Category", "Color", "Size", "Products", "Order"],
  endpoints: () => ({}),
});
