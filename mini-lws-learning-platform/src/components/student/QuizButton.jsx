import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    setActiveQuiz,
    setIsQuizPlayed,
} from '../../features/player/playerSlice';
import { useGetQuizMarkQuery } from '../../features/quiz-mark/quizMarkApi';
import { useGetQuizzesQuery } from '../../features/quiz/quizApi';
import ButtonLoader from '../skeletons/ButtonLoader';

const QuizButton = () => {
    // Get active video and the video related info from redux store
    const { activeVideo, activeQuiz, isQuizPlayed } = useSelector(
        (state) => state.player
    );

    // Get logged in user from redux store
    const { user } = useSelector((state) => state.auth);

    // Get quiz hook
    const { isLoading, data: quizzes, isSuccess } = useGetQuizzesQuery();

    // Get quiz mark hook
    const { isLoading: isLoading2, data: quizMarks } = useGetQuizMarkQuery();

    const dispatch = useDispatch();

    // Check every time active video change that the active video includes any quiz on not
    useEffect(() => {
        if (isSuccess && quizzes?.length > 0) {
            // Filter quizzes that associate with the active video
            const activeQuizzes = quizzes.filter(
                (quiz) => quiz.video_id === activeVideo?.id
            );

            if (activeQuizzes) {
                // Set quizzes
                dispatch(setActiveQuiz(activeQuizzes));
            } else {
                // Else clear active quiz if any quiz have with previous video
                dispatch(setActiveQuiz([]));
            }

            // Check logged in user already played quiz or not
            if (activeQuizzes?.length > 0 && quizMarks?.length > 0) {
                const isQuizPlayed = quizMarks.some(
                    (quiz) =>
                        activeQuizzes[0].video_id === quiz?.video_id &&
                        quiz?.student_id === user.id
                );

                // Set true or false
                dispatch(setIsQuizPlayed(isQuizPlayed));
            }
        }
    }, [activeVideo]);

    // Decide what content to display
    let content;

    if (isLoading || isLoading2) content = <ButtonLoader />;

    // If not loading and active quiz length is not equal to 0
    if (!isLoading && activeQuiz.length === 0)
        content = (
            <div className="px-3 font-bold py-1 border border-red-300 rounded-full text-sm bg-red-300 text-slate-900">
                কুইজ নেই
            </div>
        );

    // If not loading and active quiz length getter than 0 and not played
    if (!isLoading && activeQuiz.length > 0 && isQuizPlayed)
        content = (
            <div className="px-3 font-bold py-1 border border-cyan-500 rounded-full text-sm bg-cyan-500 text-slate-900">
                কুইজ দিয়েছেন
            </div>
        );

    // If not loading and active quiz length getter than 0 but played
    if (!isLoading && activeQuiz.length > 0 && !isQuizPlayed)
        content = (
            <Link
                to="/quiz"
                className="px-3 font-bold py-1 border border-cyan-500 text-cyan-500 rounded-full text-sm hover:bg-cyan-500 hover:text-slate-900"
            >
                কুইজে অংশগ্রহণ করুন
            </Link>
        );

    return content;
};

export default QuizButton;
