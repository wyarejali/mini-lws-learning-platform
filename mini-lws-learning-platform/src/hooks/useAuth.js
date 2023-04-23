import { useSelector } from 'react-redux';

// Auth hook return auth true or false
export default function useAuth() {
    // Grab the auth from redux store
    const auth = useSelector((state) => state.auth);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
}
