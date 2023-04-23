import Meta from '../../components/common/Meta';
import Player from '../../components/student/Player';
import PlayList from '../../components/student/PlayList';

const CoursePlayer = () => {
    return (
        <>
            <Meta title="Course Player" />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="grid grid-cols-3 gap-2 lg:gap-8">
                        <Player />
                        <PlayList />
                    </div>
                    <button className=""></button>
                </div>
            </section>
        </>
    );
};

export default CoursePlayer;
