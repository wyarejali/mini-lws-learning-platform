import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Header from '../header/Header';

const StudentOutlet = () => {
    const auth = useAuth();

    // If user is authenticate
    return auth ? (
        <>
            <Header />
            <Outlet />
        </>
    ) : (
        // Otherwise navigate to student login page
        <Navigate to="/" />
    );
};

export default StudentOutlet;
