import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/app/services/custom.base.query";

import { storeToken } from "@/config/token";
import { z } from "zod";
import { formSchema } from "@/utils/validation.schema";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<
      { access_token: string },
      z.infer<typeof formSchema>
    >({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Auth"],
      transformResponse: (response: { access_token: string }) => {
        storeToken("access_token", response.access_token);
        console.log(response);
        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
