import { api } from "./api";
import type { Education, CreateEducationInput } from "@portfolio/schemas";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const educationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEducation: builder.query<ApiResponse<Education[]>, void>({
      query: () => "/education",
      providesTags: ["Education"],
    }),
    createEducation: builder.mutation<ApiResponse<Education>, CreateEducationInput>({
      query: (body) => ({ url: "/education", method: "POST", body }),
      invalidatesTags: ["Education"],
    }),
    updateEducation: builder.mutation<ApiResponse<Education>, { id: number; body: CreateEducationInput }>({
      query: ({ id, body }) => ({ url: `/education/${id}`, method: "PUT", body }),
      invalidatesTags: ["Education"],
    }),
    deleteEducation: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({ url: `/education/${id}`, method: "DELETE" }),
      invalidatesTags: ["Education"],
    }),
  }),
});

export const {
  useGetEducationQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi;
