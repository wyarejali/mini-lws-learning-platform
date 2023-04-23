import { useSelector } from 'react-redux';
import avatar from '../assets/image/avatar.jpg';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Account = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <section className="py-6 bg-primary h-[80vh] flex justify-center items-center">
            <div className="text-center">
                <div className="w-[100px] mx-auto rounded-full overflow-hidden">
                    <img src={avatar} alt={user.name} />
                </div>
                <h4 className="text-xl font-semibold mt-4">{user.name}</h4>
                <h5 className="text-md font-normal mb-4">Role: {user.role}</h5>
                <Link
                    to={
                        user.role === 'admin'
                            ? '/admin/dashboard'
                            : '/course-player'
                    }
                >
                    <Button type="button">
                        {user.role === 'admin'
                            ? 'Dashboard'
                            : 'Go To Course Player'}
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default Account;
