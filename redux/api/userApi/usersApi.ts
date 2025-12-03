
import { userApi } from "./userApi";

export const jsonUserApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    getUserPosts: builder.query({
      query: (userId) => `/posts?userId=${userId}`,
       keepUnusedDataFor: 60 * 5, 
      providesTags: (result, error, userId) => [{ type: "Posts", id: userId }],
    }),
createPost: builder.mutation({
  query: (data) => ({
    url: "/posts",
    method: "POST",
    body: data,
  }),
  async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    const patch = dispatch(
      jsonUserApi.util.updateQueryData("getUserPosts", arg.userId, (draft) => {
        draft.push({
          ...arg,
          id: Date.now(), // temp ID
        });
      })
    );

    try {
      await queryFulfilled;
    } catch {
      patch.undo();
    }
  },
}),

    // createPost: builder.mutation({
    //   query: (data) => ({
    //     url: "/posts",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Posts"],
    // }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserPostsQuery,
  useCreatePostMutation,
} = jsonUserApi;
