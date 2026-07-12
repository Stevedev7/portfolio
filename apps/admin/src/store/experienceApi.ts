import { api } from "./api";
import type { Experience, CreateExperienceInput } from "@portfolio/schemas";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const experienceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExperience: builder.query<ApiResponse<Experience[]>, void>({
      query: () => "/experience",
      providesTags: ["Experience"],
    }),
    createExperience: builder.mutation<ApiResponse<Experience>, CreateExperienceInput>({
      query: (body) => ({ url: "/experience", method: "POST", body }),
      invalidatesTags: ["Experience"],
    }),
    updateExperience: builder.mutation<ApiResponse<Experience>, { id: number; body: CreateExperienceInput }>({
      query: ({ id, body }) => ({ url: `/experience/${id}`, method: "PUT", body }),
      invalidatesTags: ["Experience"],
    }),
    deleteExperience: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({ url: `/experience/${id}`, method: "DELETE" }),
      invalidatesTags: ["Experience"],
    }),
  }),
});

export const {
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
