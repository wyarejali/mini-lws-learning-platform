import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    useLoginMutation,
    useSignUpMutation,
} from '../../features/auth/authApi';
import Loading from '../skeletons/Loading';
import Error from '../common/Error';
import InputField from '../common/InputField';
import Button from '../common/Button';

const Form = ({ isLogin }) => {
    // Local state
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);

    // Login hook
    const [login, { isLoading, isError, error: loginError }] =
        useLoginMutation();

    // Sign Up hook
    const [
        signUp,
        {
            isLoading: isSignUpLoading,
            isError: isSignUpError,
            error: signUpError,
        },
    ] = useSignUpMutation();

    // Handle input change
    const handleChange = (e) => {
        const name = e.target.name; // Get input name
        const value = e.target.value; // Get input value

        // Clear error is already occurred
        setError(null);

        const newUserInfo = { ...userInfo, [name]: value };

        // Set user information
        setUserInfo(newUserInfo);
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault(); // reset default behavior

        // If the form is in login mode
        if (isLogin) {
            // Handle login mutation
            const { email, password } = userInfo;

            // Set error if email and password field is empty
            if (email === '' || password === '') {
                setError('All filed are required');
            } else {
                // All good to login
                login({ email, password });
            }

            // if the form is signUp mode
        } else {
            const { confirmPassword, ...rest } = userInfo;
            // Handle signUp mutation
            signUp(rest);
        }
    };

    // Set error if something went wrong to login
    useEffect(() => {
        if (isError || isSignUpError) {
            setError(signUpError?.data || loginError?.data);
        }
    }, [isError, isSignUpError]);

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
                {!isLogin && (
                    <InputField
                        label="Name"
                        name="name"
                        type="text"
                        errorMessage="Name is required"
                        placeholder="Sumit Saha"
                        value={userInfo?.name}
                        onChange={handleChange}
                    />
                )}

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    errorMessage="Email is required and should be valid"
                    placeholder="sumit@learnwithsumit.com"
                    value={userInfo?.email}
                    onChange={handleChange}
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    errorMessage="Password is required and should be 8-20 characters and includes at least 1 letter, 1 number and 1 special character"
                    pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                    placeholder="123$%6789"
                    value={userInfo?.password}
                    onChange={handleChange}
                />

                {!isLogin && (
                    <InputField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        errorMessage="Confirm password don't match"
                        pattern={userInfo.password}
                        placeholder="a123$%6789"
                        value={userInfo?.confirmPassword}
                        onChange={handleChange}
                    />
                )}
            </div>

            {error && <Error message={error} />}

            <div>
                <Button type="submit" style={'w-full'}>
                    {isLoading || isSignUpLoading ? (
                        <Loading />
                    ) : isLogin ? (
                        'Login'
                    ) : (
                        'Sign Up'
                    )}
                </Button>
            </div>

            {isLogin ? (
                <p className="text-center text-gray-50 text-sm">
                    <span>Don't have an account? </span>
                    <Link
                        to="/signup"
                        className="font-medium text-violet-600 hover:text-violet-500"
                    >
                        Sign Up
                    </Link>
                </p>
            ) : (
                <p className="text-center text-gray-50 text-sm">
                    <span>Already have an account? </span>
                    <Link
                        to="/login"
                        className="font-medium text-violet-600 hover:text-violet-500"
                    >
                        Log in
                    </Link>
                </p>
            )}
        </form>
    );
};

export default Form;
