import { api } from "@/app/services/api";
import { colorSchema } from "@/utils/validation.schema";
import { z } from "zod";
import { SizeRoot } from "../models/size.model";

export const sizeApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSizes: build.query<SizeRoot, void>({
      query: () => ({
        url: "/products/sizes",
        method: "GET",
      }),
      transformResponse: (response: SizeRoot) => {
        console.log(response);
        return response;
      },
      providesTags: ["Size"],
    }),
    createSize: build.mutation<SizeRoot, z.infer<typeof colorSchema>>({
      query: (body) => ({
        url: "/products/sizes",
        method: "POST",
        body: body,
      }),
      transformResponse: (response: any) => {
        return response;
      },
      invalidatesTags: ["Size"],
    }),
    deleteSize: build.mutation<SizeRoot, { id: string }>({
      query: ({ id }) => ({
        url: `/products/size/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Size"],
    }),
  }),
});

export const {
  useCreateSizeMutation,
  useGetSizesQuery,
  useDeleteSizeMutation,
} = sizeApi;
