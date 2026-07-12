import { api } from "./api";
import type { Config } from "@portfolio/schemas";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const configApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query<ApiResponse<Config>, void>({
      query: () => "/config",
      providesTags: ["Config"],
    }),
    updateConfig: builder.mutation<ApiResponse<Config>, Config>({
      query: (body) => ({
        url: "/config",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Config"],
    }),
  }),
});

export const { useGetConfigQuery, useUpdateConfigMutation } = configApi;
