import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Admin login
        adminLogin: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken, user } = data;

                    if (user?.role === 'admin') {
                        // Save the user info to localStorage
                        localStorage.setItem(
                            'auth',
                            JSON.stringify({
                                accessToken,
                                user,
                            })
                        );

                        // Update redux store with the logged in user
                        dispatch(userLoggedIn({ accessToken, user }));
                    }
                } catch (error) {
                    // Handle error in the ui
                }
            },
        }),

        // Student login
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken, user } = data;

                    // Save the user info to localStorage
                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            accessToken,
                            user,
                        })
                    );

                    // Update redux store with the logged in user
                    dispatch(userLoggedIn({ accessToken, user }));
                } catch (error) {
                    // Handle error in the ui
                }
            },
        }),

        // Student registration
        signUp: builder.mutation({
            query: (data) => ({
                url: '/signup',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken, user } = data;

                    // Save the user info to localStorage
                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            accessToken,
                            user,
                        })
                    );

                    // Update redux store with the logged in user
                    dispatch(userLoggedIn({ accessToken, user }));
                } catch (error) {
                    // Handle error in the ui
                }
            },
        }),
    }),
});

export const { useAdminLoginMutation, useLoginMutation, useSignUpMutation } =
    authApi;
