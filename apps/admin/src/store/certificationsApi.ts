import { api } from "./api";
import type { Certification, CreateCertificationInput } from "@portfolio/schemas";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const certificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCertifications: builder.query<ApiResponse<Certification[]>, void>({
      query: () => "/certifications",
      providesTags: ["Certifications"],
    }),
    createCertification: builder.mutation<ApiResponse<Certification>, CreateCertificationInput>({
      query: (body) => ({ url: "/certifications", method: "POST", body }),
      invalidatesTags: ["Certifications"],
    }),
    updateCertification: builder.mutation<ApiResponse<Certification>, { id: number; body: CreateCertificationInput }>({
      query: ({ id, body }) => ({ url: `/certifications/${id}`, method: "PUT", body }),
      invalidatesTags: ["Certifications"],
    }),
    deleteCertification: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({ url: `/certifications/${id}`, method: "DELETE" }),
      invalidatesTags: ["Certifications"],
    }),
  }),
});

export const {
  useGetCertificationsQuery,
  useCreateCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
} = certificationsApi;
