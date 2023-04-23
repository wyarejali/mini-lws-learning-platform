import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userLoggedOut } from '../../features/auth/authSlice';
import useAuth from '../../hooks/useAuth';
import Logo from '../common/Logo';
import { logOutIcon, menuIcon } from '../common/Icons';
import { useEffect, useState } from 'react';
import { resetPlayer } from '../../features/player/playerSlice';

const Header = () => {
    // Local state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Get logged in user from redux store
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const isLoggedIn = useAuth();

    // LogOut handler
    const logoutHandler = () => {
        // Clear auth from redux store
        dispatch(userLoggedOut());

        // Reset Player
        dispatch(resetPlayer());
    };

    // Mobile menu off on window resize
    useEffect(() => {
        window.addEventListener(
            'resize',
            () => {
                const width = window.innerWidth;

                if (width > 1024) setIsMobileMenuOpen(false);
            },
            false
        );
    }, []);

    // Admin nav items
    const adminMenus = [
        { id: 1, title: 'Dashboard', url: '/admin/dashboard' },
        { id: 2, title: 'Assignment', url: '/admin/assignment' },
        { id: 3, title: 'Assignment Mark', url: '/admin/assignment-mark' },
        { id: 4, title: 'Videos', url: '/admin/videos' },
        { id: 5, title: 'Quizzes', url: '/admin/quizzes' },
        { id: 6, title: [user?.name], url: '/admin/account' },
    ];

    // Student nav items
    const studentMenus = [
        { id: 1, title: 'Course Player', url: '/course-player' },
        { id: 2, title: 'Leader Board', url: '/leader-board' },
        { id: 3, title: [user?.name], url: './account' },
    ];

    // Decide what menu to display
    let navMenu;
    if (isLoggedIn) {
        user?.role === 'admin'
            ? (navMenu = adminMenus.map((menu) => (
                  <NavLink
                      key={menu.id}
                      to={menu.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                  >
                      {menu.title}
                  </NavLink>
              )))
            : (navMenu = studentMenus.map((menu) => (
                  <NavLink
                      key={menu.id}
                      to={menu.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                  >
                      {menu.title}
                  </NavLink>
              )));
    }

    return (
        <header className="shadow-md">
            <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
                <Logo />
                <button
                    onClick={() => {
                        setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                >
                    {menuIcon}
                </button>
                <nav
                    className={`${
                        isMobileMenuOpen
                            ? 'block absolute top-0 left-0 flex flex-col gap-3 p-4 bg-slate-800 w-[300px] h-screen'
                            : 'hidden lg:flex items-center gap-3'
                    } `}
                >
                    {navMenu}
                    <button
                        className={`flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan  bg-red-600 hover:bg-red-700`}
                        onClick={logoutHandler}
                    >
                        {logOutIcon}
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
