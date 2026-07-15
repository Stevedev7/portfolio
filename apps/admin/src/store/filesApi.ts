import { api } from "./api";
import type { FileMeta } from "@portfolio/schemas";

interface ApiResponse<T> {
	success: boolean;
	data: T;
	message: string;
}

export const filesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getFiles: builder.query<ApiResponse<FileMeta[]>, void>({
			query: () => "/files",
			providesTags: ["Files"],
		}),
		uploadFile: builder.mutation<ApiResponse<FileMeta>, FormData>({
			query: (formData) => ({
				url: "/files",
				method: "POST",
				body: formData,
			}),
			invalidatesTags: ["Files"],
		}),
		deleteFile: builder.mutation<ApiResponse<null>, string>({
			query: (key) => ({ url: `/files/${key}`, method: "DELETE" }),
			invalidatesTags: ["Files"],
		}),
	}),
});

export const { useGetFilesQuery, useUploadFileMutation, useDeleteFileMutation } = filesApi;
