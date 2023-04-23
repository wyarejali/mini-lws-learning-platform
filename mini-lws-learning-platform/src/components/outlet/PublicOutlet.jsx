import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PublicOutlet = ({ children }) => {
    const { user } = useSelector((state) => state?.auth);

    const isLoggedIn = useAuth();

    // Check user is logged in or not
    if (isLoggedIn) {
        // If user logged in and the user is a admin navigate to dashboard
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" />;

            // If user logged in and user is a student navigate to course player
        } else {
            return <Navigate to="/course-player" />;
        }

        // If the user is not logged in navigate to login page
    } else {
        return children;
    }
};

export default PublicOutlet;
