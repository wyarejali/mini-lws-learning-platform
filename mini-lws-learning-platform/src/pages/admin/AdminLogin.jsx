import { useEffect, useState } from 'react';
import InputField from '../../components/common/InputField';
import Loading from '../../components/skeletons/Loading';
import { useAdminLoginMutation } from '../../features/auth/authApi';
import Logo from '../../components/common/Logo';
import Error from '../../components/common/Error';
import Button from '../../components/common/Button';
import Meta from '../../components/common/Meta';

const AdminLogin = () => {
    // Local state
    const [adminInfo, setAdminInfo] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    // Admin login hook
    const [
        adminLogin,
        { isLoading, isError, error: loginError, isSuccess, data },
    ] = useAdminLoginMutation();

    // Handle input change
    const handleChange = (e) => {
        const name = e.target.name; // Get input name
        const value = e.target.value; // Get input value

        // Clear error is already occurred
        setError(null);

        const adminData = { ...adminInfo, [name]: value };

        // Set admin information
        setAdminInfo(adminData);
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault(); // reset default behavior

        const { email, password } = adminInfo;

        // Set error if email and password field is empty
        if (email === '' || password === '') {
            setError('All filed are required');
        } else {
            // All good to login
            adminLogin(adminInfo);
        }
    };

    // Set error if something went wrong to login
    useEffect(() => {
        if (isError && loginError) {
            setError(loginError?.data);
        }
    }, [isError]);

    // Set error if the user is not admin
    useEffect(() => {
        if (isSuccess && data?.user?.role !== 'admin') {
            setError('Sorry, you are not an admin!');
        }
    }, [isSuccess]);

    return (
        <>
            <Meta title="Admin login" />
            <section className="py-6 bg-primary h-screen grid place-items-center">
                <div className="mx-auto max-w-md px-5 lg:px-0">
                    <div>
                        <Logo />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                            Sign in to Admin Account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                errorMessage="Email is required and should be valid"
                                placeholder="Email Address"
                                value={adminInfo?.email}
                                onChange={handleChange}
                            />

                            <InputField
                                label="Password"
                                name="password"
                                type="password"
                                errorMessage="Password is required"
                                placeholder="Password"
                                value={adminInfo?.password}
                                onChange={handleChange}
                            />
                        </div>

                        {error && <Error message={error} />}

                        <div>
                            <Button type="submit" style="w-full">
                                {isLoading ? <Loading /> : ' Sign in'}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AdminLogin;
