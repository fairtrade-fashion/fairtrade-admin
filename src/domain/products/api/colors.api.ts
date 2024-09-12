import { api } from "@/app/services/api";
import { ColorRoot } from "../models/colors.model";
import { colorSchema } from "@/utils/validation.schema";
import { z } from "zod";

export const colorApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getColors: build.query<ColorRoot, void>({
      query: () => ({
        url: "/colors",
        method: "GET",
      }),
      transformResponse: (response: ColorRoot) => {
        return response;
      },
      providesTags: ["Color"],
    }),
    createColor: build.mutation<ColorRoot, z.infer<typeof colorSchema>>({
      query: (body) => ({
        url: "/colors",
        method: "POST",
        body: body,
      }),
      transformResponse: (response: any) => {
        return response;
      },
      invalidatesTags: ["Color"],
    }),
    deleteColor: build.mutation<ColorRoot, { id: string }>({
      query: ({ id }) => ({
        url: `/colors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Color"],
    }),
  }),
});

export const {
  useCreateColorMutation,
  useDeleteColorMutation,
  useGetColorsQuery,
} = colorApi;
