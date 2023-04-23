import { Link } from 'react-router-dom';
import {
    cameraIcon,
    fileIcon,
    listIcon,
    resultIcon,
} from '../../components/common/Icons';
import Meta from '../../components/common/Meta';

const Dashboard = () => {
    const menus = [
        {
            id: 1,
            title: 'Videos',
            url: '/admin/videos',
            icon: cameraIcon,
        },
        {
            id: 2,
            title: 'Assignment',
            url: '/admin/assignment',
            icon: fileIcon,
        },
        {
            id: 3,
            title: 'Quizzes',
            url: '/admin/quizzes',
            icon: listIcon,
        },
        {
            id: 4,
            title: 'assignmentMark',
            url: '/admin/assignment-mark',
            icon: resultIcon,
        },
    ];

    return (
        <>
            <Meta title="Dashboard" />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="px-3 md:lg:xl:px-40  py-20 bg-opacity-10">
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 p-8">
                            {menus.map((menu) => (
                                <Link
                                    key={menu.id}
                                    to={menu.url}
                                    className="dashboard-item-card"
                                >
                                    {menu.icon}

                                    <p className="text-slate-200 mt-3 ">
                                        {menu.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
