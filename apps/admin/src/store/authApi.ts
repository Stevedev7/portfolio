import { api } from "./api";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  data: { token: string };
  message: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
