import { api } from "@/app/services/api";
import { CategoryResponse } from "@/utils/models/model";
import { categorySchema } from "@/utils/validation.schema";
import { z } from "zod";

export const categoryApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCategories: build.query<CategoryResponse[], void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      transformResponse: (response: CategoryResponse[]) => {
        return response;
      },
      providesTags: ["Category"],
    }),
    createCategory: build.mutation<
      CategoryResponse,
      z.infer<typeof categorySchema>
    >({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      transformResponse: (response: CategoryResponse) => {
        return response;
      },
      invalidatesTags: ["Category"],
    }),
    updateCategory: build.mutation<
      CategoryResponse,
      { id: string; data: z.infer<typeof categorySchema> }
    >({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: CategoryResponse) => {
        return response;
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
// export const { useCreateCatMutation, useGetCategoriesQuery } = categoryApi;
