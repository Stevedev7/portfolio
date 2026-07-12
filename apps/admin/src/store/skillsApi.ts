import { api } from "./api";
import type { Skill, CreateSkillInput } from "@portfolio/schemas";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const skillsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<ApiResponse<Skill[]>, void>({
      query: () => "/skills",
      providesTags: ["Skills"],
    }),
    createSkill: builder.mutation<ApiResponse<Skill>, CreateSkillInput>({
      query: (body) => ({ url: "/skills", method: "POST", body }),
      invalidatesTags: ["Skills"],
    }),
    updateSkill: builder.mutation<ApiResponse<Skill>, { id: number; body: CreateSkillInput }>({
      query: ({ id, body }) => ({ url: `/skills/${id}`, method: "PUT", body }),
      invalidatesTags: ["Skills"],
    }),
    deleteSkill: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({ url: `/skills/${id}`, method: "DELETE" }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillsApi;
