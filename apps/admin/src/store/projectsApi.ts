import { api } from "./api";
import type { Project, CreateProjectInput } from "@portfolio/schemas";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ApiResponse<Project[]>, void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation<ApiResponse<Project>, CreateProjectInput>({
      query: (body) => ({ url: "/projects", method: "POST", body }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation<ApiResponse<Project>, { id: number; body: CreateProjectInput }>({
      query: ({ id, body }) => ({ url: `/projects/${id}`, method: "PUT", body }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({ url: `/projects/${id}`, method: "DELETE" }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
