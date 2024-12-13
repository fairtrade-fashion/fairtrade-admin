import { api } from "@/app/services/api";
import {
  TopSellingProduct,
  TotalCustomersRoot,
  TotalOrderRoot,
  TotalProductsRoot,
  TotalSalesRoot,
} from "../models/dashboard.model";

export const DashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    totalSales: builder.query<TotalSalesRoot, void>({
      query: () => ({
        url: `/analytics/total-sales`,
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
    topSellingProducts: builder.query<TopSellingProduct[], { limit: number }>({
      query: ({ limit }) => ({
        url: `/analytics/top-selling-products?limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
    totalOrders: builder.query<TotalOrderRoot, void>({
      query: () => ({
        url: `/analytics/total-orders`,
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
    totalProducts: builder.query<TotalProductsRoot, void>({
      query: () => ({
        url: `/analytics/total-products`,
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
    totalCustomers: builder.query<TotalCustomersRoot, void>({
      query: () => ({
        url: `/analytics/total-customers`,
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useTotalSalesQuery,
  useTopSellingProductsQuery,
  useTotalOrdersQuery,
  useTotalProductsQuery,
  useTotalCustomersQuery,
} = DashboardApi;
