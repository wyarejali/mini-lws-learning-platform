import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
    accessToken: null,
    user: null,
};

// Create auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // User logged in action
        userLoggedIn: (state, action) => {
            const { accessToken, user } = action.payload;

            state.accessToken = accessToken;
            state.user = user;
        },

        // Logout action
        userLoggedOut: (state) => {
            state.accessToken = null;
            state.user = null;

            // Clear auth from local storage
            localStorage.clear();
        },
    },
});

// Exports
export default authSlice.reducer;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
