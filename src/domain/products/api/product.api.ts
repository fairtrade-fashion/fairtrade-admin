import { api } from "@/app/services/api";
import {
  FetchProductResponse,
  Product,
  ProductResponse,
} from "../models/products.model";

export const productApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    fetchProducts: build.query<
      FetchProductResponse,
      {
        search: string;
        page: number;
        limit: number;
        minPrice: number;
        maxPrice: number;
        color: string;
        size: string;
        sortBy: string;
        category: string;
      }
    >({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: FetchProductResponse) => {
        console.log("response::: ", response);
        return response;
      },
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<ProductResponse, FormData>({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
        formData: true, // This tells RTK Query that we're sending FormData
      }),
      invalidatesTags: ["Products"],
    }),
    editProduct: build.mutation<
      ProductResponse,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      transformResponse: (response: ProductResponse) => {
        return response;
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    viewProduct: build.query<Product, { id: string }>({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: Product) => {
        return response;
      },
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useFetchProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useViewProductQuery,
} = productApi;
