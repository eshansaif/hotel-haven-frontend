import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {axios} from ".";

const privateApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: axios.defaults.baseURL,
    prepareHeaders: (headers) => {
      if (localStorage.getItem("token")) {
        headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      }
      return headers;
    },
  }),
  reducerPath: "privateApi",
  tagTypes: ["wishlist", "profile", "blogs"],

  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "/wishlist",
      providesTags: ["wishlist"],
    }),
    postWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    deleteWishlistById: builder.mutation({
      query: (_id) => ({
        url: `/wishlist/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
    getProfile: builder.query({
      query: (_id) => `/profile/${_id}`,
      providesTags: ["profile"],
    }),

    // Blogs for user
    getUserBlogById: builder.query({
      query: (_id) => `/blog/user-blog/${_id}`,
      providesTags: ["blogs"],
    }),
    updateUserBlogById: builder.mutation({
      query: ({_id, data}) => ({
        url: `/blog/user-blog/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),
    deleteUserBlogById: builder.mutation({
      query: (_id) => ({
        url: `/blog/user-blog/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
    getUserBlogs: builder.query({
      query: () => "/blog/user-blog",
      providesTags: ["blogs"],
    }),
    postUserBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/user-blog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),

    // blogs for all users
    getBlogById: builder.query({
      query: (_id) => `/blog/${_id}`,
      providesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  usePostWishlistMutation,
  useDeleteWishlistByIdMutation,
  useGetProfileQuery,
  useGetUserBlogByIdQuery,
  useDeleteUserBlogByIdMutation,
  useGetUserBlogsQuery,
  usePostUserBlogMutation,
  useGetBlogByIdQuery,
} = privateApi;

export default privateApi;
