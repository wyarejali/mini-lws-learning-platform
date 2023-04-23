import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveVideo } from '../../features/player/playerSlice';
import { useGetVideosQuery } from '../../features/video/videoApi';
import Error from '../common/Error';
import VideoLoader from '../skeletons/VideoLoader';
import Video from './Video';

const PlayList = () => {
    // Get active video from redux store
    const { activeVideo } = useSelector((state) => state.player);

    // Get all videos
    const { isLoading, isError, isSuccess, data: videos } = useGetVideosQuery();

    const dispatch = useDispatch();

    // Update player after loaded videos and set first video as active video
    useEffect(() => {
        if (isSuccess && videos?.length !== 0) {
            dispatch(setActiveVideo(activeVideo || videos[0]));
        }
    }, [isSuccess]);

    // Decide what content to display
    let content = '';

    // If loading
    if (isLoading)
        content = (
            <>
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
            </>
        );

    // If not loading but error occurred
    if (!isLoading && isError)
        content = <Error message="Something went wrong." />;

    // If not loading and error occurred but video length is 0
    if (!isLoading && !isError && videos.length === 0)
        content = <p>No video found!</p>;

    // If not loading and no error occurred and videos length is getter than 0
    if (!isLoading && !isError && videos.length > 0)
        content = videos.map((video) => <Video key={video.id} video={video} />);

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
            {content}
        </div>
    );
};

export default PlayList;
