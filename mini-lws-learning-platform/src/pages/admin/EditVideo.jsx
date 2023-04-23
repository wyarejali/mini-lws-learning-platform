import { useParams } from 'react-router-dom';
import VideoForm from '../../components/admin/VideoForm';
import Error from '../../components/common/Error';
import Loading from '../../components/skeletons/Loading';
import { useGetVideoQuery } from '../../features/video/videoApi';
import Meta from '../../components/common/Meta';

const EditVideo = () => {
    // Get the video id from address bar
    const { id } = useParams();

    // Get video information associate with the id
    const { isLoading, isError, data: video } = useGetVideoQuery(id);

    // Decide what content to display
    let content = '';

    // If loading
    if (true) content = <Loading />;

    // If not loading but error occurred
    if (!isLoading && isError)
        content = <Error message="Something went wrong." />;

    // // If not loading and no error occurred and the video found
    if (!isLoading && !isError && video.id)
        content = <VideoForm isEditing={true} editItem={video} />;

    return (
        <>
            <Meta title="Edit Video" />
            <section className="py-6 bg-primary h-screen grid ">
                <div className="mx-auto lg:w-[768px] w-full">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Edit Video
                    </h2>

                    <div className="mt-6">{content}</div>
                </div>
            </section>
        </>
    );
};

export default EditVideo;
