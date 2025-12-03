import { baseApi } from "./baseApi";
export const USERS_URL = "/user";
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: "/merchant/login",
                method: "POST",
                body: data,
            }),
        }),
        registerUser: builder.mutation({
            query: (formData) => ({
                url: `${USERS_URL}/register`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["User"],

        }),

    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;