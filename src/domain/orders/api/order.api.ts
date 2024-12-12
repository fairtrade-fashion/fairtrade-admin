import { api } from "@/app/services/api";
import {
  OrderRoot,
  OrderStatusResponseRoot,
  SingleOrderRoot,
} from "../model/order.model";

export const OrderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query<
      OrderRoot,
      {
        skip: number;
        take: number;
      }
    >({
      query: () => ({
        url: `/orders`,
        method: "GET",
        params: {
          skip: 0,
          take: 10,
        },
      }),
      providesTags: ["Order"],
    }),
    getOrderById: builder.query<SingleOrderRoot, { id: string }>({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    orderStatus: builder.mutation<
      OrderStatusResponseRoot,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `orders/user/orders/status`,
        method: "PATCH",
        body: { id, status },
        formData: true,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetOrderByIdQuery,
  useOrderStatusMutation,
} = OrderApi;
