import { useSelector } from 'react-redux';
import { formateDate } from '../../utils/timeFormatter';
import PlayerLoader from '../skeletons/PlayerLoader';
import AssignmentButton from './AssignmentButton';
import QuizButton from './QuizButton';
import TitleAndDateLoader from '../skeletons/TitleAndDateLoader';

const Player = () => {
    const { isLoading, activeVideo } = useSelector((state) => state.player);

    return (
        <>
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
                {isLoading ? (
                    <PlayerLoader />
                ) : (
                    <iframe
                        width="100%"
                        className="aspect-video"
                        src={activeVideo?.url}
                        title={activeVideo?.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}

                <div>
                    {isLoading ? (
                        <TitleAndDateLoader />
                    ) : (
                        <>
                            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                                {activeVideo?.title}
                            </h1>
                            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                                Uploaded on{' '}
                                {formateDate(activeVideo?.createdAt)}
                            </h2>
                        </>
                    )}
                    <div className="flex gap-4">
                        <AssignmentButton />
                        <QuizButton />
                    </div>
                    <p className="mt-4 text-sm text-slate-400 leading-6">
                        {activeVideo?.description}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Player;
