import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';

// Auth check hook
export default function useAuthCheck() {
    // Local State
    const [authChecked, setAuthChecked] = useState(false);

    const dispatch = useDispatch();

    // Check user already logged in or not
    useEffect(() => {
        const localAuth = localStorage.getItem('auth');

        if (localAuth) {
            const auth = JSON.parse(localAuth);

            if (auth?.accessToken && auth?.user) {
                // Update redux store with if user exist in localStorage
                dispatch(
                    userLoggedIn({
                        accessToken: auth.accessToken,
                        user: auth.user,
                    })
                );
            }
        }

        // Auth check completed and set authChecked true
        setAuthChecked(true);
    }, []);

    // Return authChecked
    return authChecked;
}
