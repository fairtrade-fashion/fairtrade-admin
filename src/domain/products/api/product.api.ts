import { api } from "@/app/services/api";
import {
  FetchProductResponse,
  ProductResponse,
  SingleProductRoot,
} from "../models/products.model";

export const productApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    fetchProducts: build.query<
      FetchProductResponse,
      {
        name: string;
        page: number;
        limit: number;
        // minPrice: string;
        // maxPrice: string;
        // color: string;
        // size: string;
        sortBy: string;
        category: string;
      }
    >({
      query: ({
        name,
        page,
        limit,
        // minPrice,
        // maxPrice,
        // color,
        // size,
        sortBy,
        category,
      }) => ({
        url: `/products/search?name=${name}&page=${page}&limit=${limit}&sortBy=${sortBy}&category=${category}
        `,
        method: "GET",
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
    viewProduct: build.query<SingleProductRoot, { id: string }>({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: SingleProductRoot) => {
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
