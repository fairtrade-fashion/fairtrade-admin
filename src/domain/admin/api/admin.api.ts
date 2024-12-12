import { api } from "@/app/services/api";
import { AdminUserResponseRoot } from "../model/admin.model";

export const adminApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    createAdminUser: build.mutation<
      AdminUserResponseRoot,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/users/seed-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const { useCreateAdminUserMutation } = adminApi;
