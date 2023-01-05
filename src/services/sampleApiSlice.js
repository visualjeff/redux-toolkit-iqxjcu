import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { messageCreated } from '../redux/notificationsSlice';

// Define a service using a base URL and expected endpoints
export const sampleApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (name) => name,
      transformResponse: (response) => response, // optional
      providesTags: ['Users'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect, dispatch action
        dispatch(messageCreated('Fetching users...'));
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect, dispatch action
          dispatch(messageCreated('Users received!'));
        } catch (err) {
          // `onError` side-effect, dispatch action
          // { error: { status: 500, data: { message: 'error reasons' } }
          dispatch(messageCreated('Error fetching users!'));
        }
      },
    }),
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
      transformResponse: (response) => response, // optional
      providesTags: ['User'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect, dispatch action
        dispatch(messageCreated('Fetching user...'));
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect, dispatch action
          dispatch(messageCreated('User received!'));
        } catch (err) {
          // `onError` side-effect, dispatch action
          // { error: { status: 500, data: { message: 'error reasons' } }
          dispatch(messageCreated('Error fetching user!'));
        }
      },
    }),
    getPosts: builder.query({
      query: (name) => name,
      transformResponse: (response) => response, // optional
      providesTags: ['Posts'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect, dispatch action
        dispatch(messageCreated('Fetching posts...'));
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect, dispatch action
          dispatch(messageCreated('Posts received!'));
        } catch (err) {
          // `onError` side-effect, dispatch action
          // { error: { status: 500, data: { message: 'error reasons' } }
          dispatch(messageCreated('Error fetching posts!'));
        }
      },
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      transformResponse: (response) => {
        // console.log(`response: ${JSON.stringify(response)}`);
        return response;
      }, // optional
      providesTags: ['Post'],
      // We can monitor the progress of the query
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        // `onStart` side-effect, dispatch action
        dispatch(messageCreated('Fetching post...'));
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect, dispatch action
          dispatch(messageCreated('Post received!'));

          // Get user Name associated with the post using userId as the key
          /* This service call does work.  But not sure how to bring the two payloads together.  See getUserPost below.

          const { data: user } = await sampleApi.endpoints.getUser.initiate(
            data.userId
          )(dispatch, getState);
          */
        } catch (err) {
          // `onError` side-effect, dispatch action
          // { error: { status: 500, data: { message: 'error reasons' } }
          dispatch(messageCreated('Error fetching post!'));
        }
      },
    }),
    getUserPost: builder.query({
      // An example of executing two queries for a custom return value.
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // First query
        const post = await fetchWithBQ(`posts/${_arg}`);
        if (post.error) return { error: post.error };
        const postData = post.data;
        // Second query
        const user = await fetchWithBQ(`/users/${postData.userId}`);
        const userData = user.data;
        // Merge results from two queries
        const result = {
          data: {
            ...postData,
            name: userData.name,
          },
        };
        return result.data ? { data: result.data } : { error: result.error };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserQuery,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetPostQuery,
  useGetUserPostQuery,
} = sampleApi;
