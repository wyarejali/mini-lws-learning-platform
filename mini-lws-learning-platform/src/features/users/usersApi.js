import { apiSlice } from '../api/apiSlice';

// assignment api
export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all users
        getUsers: builder.query({
            query: () => '/users',
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;
