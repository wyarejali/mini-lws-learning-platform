import { useGetVideosQuery } from '../../features/video/videoApi';
import Error from '../../components/common/Error';
import Video from '../../components/admin/Video';
import { Link } from 'react-router-dom';
import Loading from '../../components/skeletons/Loading';
import Meta from '../../components/common/Meta';

const Videos = () => {
    // Get videos
    const { data: videos, isLoading, isError } = useGetVideosQuery();

    // Decide what content to display
    let content = '';

    // If loading
    if (true) content = <Loading />;

    // If not loading but error occurred
    if (!isLoading && isError)
        content = <Error message="Something went wrong." />;

    // If not loading and error occurred but video length is 0
    if (!isLoading && !isError && videos.length === 0)
        content = <p>No video found!</p>;

    // // If not loading and no error occurred and videos length is getter than 0
    if (!isLoading && !isError && videos.length > 0)
        content = (
            <>
                <table className="divide-y-1 text-base divide-gray-600 w-full">
                    <thead>
                        <tr>
                            <th className="table-th">Video Title</th>
                            <th className="table-th">Description</th>
                            <th className="table-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-600/50">
                        {videos.map((video) => (
                            <Video key={video.id} video={video} />
                        ))}
                    </tbody>
                </table>
            </>
        );

    return (
        <>
            <Meta title="Videos" />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <Link to="/admin/add-video" className="btn ml-auto">
                                Add Video
                            </Link>
                        </div>
                        <div className="overflow-x-auto mt-4">{content}</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Videos;
