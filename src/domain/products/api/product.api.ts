import { api } from "@/app/services/api";
import {
  EditProduct,
  FetchProductResponse,
  Product,
  ProductRequest,
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
    createProduct: build.mutation<ProductResponse, ProductRequest>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body: body,
      }),
      transformResponse: (response: ProductResponse) => {
        return response;
      },
      invalidatesTags: ["Products"],
    }),
    editProduct: build.mutation<
      ProductResponse,
      { id: string; data: EditProduct }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
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
