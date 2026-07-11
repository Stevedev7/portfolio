import { api } from "./api";
import type { About } from "@portfolio/schemas";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const aboutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query<ApiResponse<About>, void>({
      query: () => "/about",
      providesTags: ["About"],
    }),
    updateAbout: builder.mutation<ApiResponse<About>, About>({
      query: (body) => ({
        url: "/about",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["About"],
    }),
  }),
});

export const { useGetAboutQuery, useUpdateAboutMutation } = aboutApi;
