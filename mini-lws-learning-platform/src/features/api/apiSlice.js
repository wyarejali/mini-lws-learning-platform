import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create api Slice
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,

        prepareHeaders: async (headers, { getState }) => {
            const token = getState()?.auth?.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    // Endpoints
    endpoints: () => ({}),
});
