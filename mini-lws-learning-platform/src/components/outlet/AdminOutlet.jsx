import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Header from '../header/Header';

const AdminOutlet = () => {
    const { user } = useSelector((state) => state.auth);

    const isLoggedIn = useAuth();

    // If user logged in and the user is an admin
    return isLoggedIn && user?.role === 'admin' ? (
        <>
            <Header />
            <Outlet />
        </>
    ) : (
        // If user is not logged in then navigate to admin login page
        <Navigate to="/admin" />
    );
};

export default AdminOutlet;
