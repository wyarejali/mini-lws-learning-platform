import Form from '../../components/student/Form';
import Logo from '../../components/common/Logo';
import Meta from '../../components/common/Meta';

const SignUp = () => {
    return (
        <>
            <Meta title="Sign Up" />
            <section className="py-6 bg-primary h-screen grid place-items-center">
                <div className="mx-auto w-[400px] px-5 lg:px-0">
                    <div>
                        <Logo />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                            Create Your New Account
                        </h2>
                    </div>
                    <Form />
                </div>
            </section>
        </>
    );
};

export default SignUp;
