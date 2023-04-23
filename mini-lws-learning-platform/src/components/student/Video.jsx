import { useDispatch } from 'react-redux';
import { setActiveVideo } from '../../features/player/playerSlice';
import { playIcon } from '../common/Icons';

const Video = ({ video }) => {
    const { title, views, duration } = video || {};

    const dispatch = useDispatch();

    // Handle play a video
    const handlePlayVideo = () => {
        dispatch(setActiveVideo(video));
    };

    return (
        <div
            className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2"
            onClick={handlePlayVideo}
        >
            {playIcon}

            <div className="flex flex-col w-full">
                <p className="text-slate-50 text-sm font-medium">{title}</p>

                <div>
                    <span className="text-gray-400 text-xs mt-1">
                        {duration} Mins
                    </span>
                    <span className="text-gray-400 text-xs mt-1"> | </span>
                    <span className="text-gray-400 text-xs mt-1">
                        {views} views
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Video;
