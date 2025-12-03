import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://192.168.0.109:5000/api/v1",
        baseUrl: "https://apidev.edufee.online/api",
        // credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            // Example: get token from your auth slice
            const token = (getState() as any).auth.token;
            if (token) {
                if (token) {
                   headers.set("Authorization", `Bearer ${token}`);
                }
            }

            // You can also set Content-Type or other headers
            headers.set("Content-Type", "application/json");

            return headers;
        },
    }),
       tagTypes: ["User","Task"],

    endpoints: () => ({}),
});