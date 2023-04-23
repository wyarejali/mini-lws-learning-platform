import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/common/Button';
import { useSteps } from '../../hooks/useSteps';
import { useEffect, useState } from 'react';
import { useSubmitQuizMutation } from '../../features/quiz-mark/quizMarkApi';
import Loading from '../../components/skeletons/Loading';
import { updateActiveQuiz } from '../../features/player/playerSlice';
import QuizResultModal from '../../components/modal/QuizResultModal';
import { Link } from 'react-router-dom';
import Meta from '../../components/common/Meta';

const Quiz = () => {
    // Local state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizResult, setQuizResult] = useState(null);

    // Get active video and relate information
    const { activeQuiz, activeVideo, isQuizPlayed } = useSelector(
        (state) => state.player
    );

    // Get logged in user from redux store
    const { user } = useSelector((state) => state.auth);

    // Display quizzes one by one
    const { step, prev, next, isFirstStep, isLastStep, stepIndex } = useSteps(
        activeQuiz || []
    );

    const dispatch = useDispatch();

    // Submit quiz hook
    const [submitQuiz, { isLoading, isError, isSuccess }] =
        useSubmitQuizMutation();

    // Handle answer selection
    const handleAnswerSelect = (e, optionIndex) => {
        const isSelected = e.target.checked;

        const newQuiz = JSON.parse(JSON.stringify(activeQuiz));

        newQuiz[stepIndex].options[optionIndex].selected = isSelected;

        dispatch(updateActiveQuiz(newQuiz));
    };

    // Handle next question
    const handleNextQuestion = (e) => {
        e.preventDefault();
        next();
    };

    // Handle previous question
    const handlePrevQuestion = () => {
        prev();
    };

    // Handle submit quiz
    const handleSubmitQuiz = (e) => {
        // reset default form submit behavior
        e.preventDefault();

        let totalCorrect = 0;
        let totalWrong = 0;
        let isAllQuestionsAnswered = true;

        activeQuiz.map((question) => {
            let isCorrect = true;
            let isAnyOptionSelected = false;

            question.options.map((option) => {
                // If the option is selected
                if (option.selected) {
                    isAnyOptionSelected = true;
                    // But the option is not correct
                    if (!option.isCorrect) {
                        isCorrect = false;
                    }
                }

                // If the option is correct and not selected
                if (option.isCorrect && option.selected === false) {
                    isCorrect = false;
                }
            });

            // if the any option is selected and it selected option is correct then increase totalCorrect
            if (isAnyOptionSelected && isCorrect) {
                totalCorrect++;

                // Else increase totalWrong
            } else {
                totalWrong++;
            }

            // If any option is not selected
            if (!isAnyOptionSelected) {
                isAllQuestionsAnswered = false;
            }
        });

        if (isAllQuestionsAnswered) {
            // Now we sure that all the questions answered
            // So calculate the result and update database
            const mark = totalCorrect * 5; // as each question have 5 mark

            const data = {
                student_id: user.id,
                student_name: user.name,
                video_id: activeVideo.id,
                video_title: activeVideo.title,
                totalQuiz: activeQuiz.length,
                totalCorrect,
                totalWrong,
                totalMark: activeQuiz.length * 5,
                mark,
            };

            // If user confirm then save the data to database
            if (confirm('আপনি কি নিশ্চিত, কুইজ জমা দেয়ার জন্য?') === true) {
                // If confirm then submit
                submitQuiz(data);

                // Set quiz result
                setQuizResult({ ...data, totalQuiz: activeQuiz.length });
            }
        } else {
            alert(
                `দয়া করে সবগুলো প্রশ্নের উত্তর দিন। তারপর জমা দিন।. \nএখনো ${countUnansweredQuestions(
                    activeQuiz
                )} প্রশ্নের উত্তর দেয়া বাকি আছে।`
            );
        }
    };

    // Count how many question is not answered
    function countUnansweredQuestions(data = []) {
        //Initial value
        let count = 0;

        data.map((question) => {
            // Find how many question is selected
            const selectedOption = question.options.find(
                (option) => option.selected === true
            );

            // if the option is not selected increase the initial value by 1
            if (!selectedOption) {
                count++;
            }
        });

        // Return the value
        return count;
    }

    // After successfully save quiz mart to database show the result
    useEffect(() => {
        if (isSuccess) {
            setIsModalOpen(true);
        }
    }, [isSuccess]);

    // If error occurred after submit quiz
    useEffect(() => {
        if (isError) {
            alert('Something went wrong, try again');
        }
    }, [isError]);

    // Close handler
    const closeHandler = () => {
        setIsModalOpen((prev) => !prev);
    };

    // Decide what content to display
    let content;

    // If there is no quiz with the active played video
    if (activeQuiz?.length === 0)
        content = (
            <div className="flex flex-col justify-center items-center gap-6 min-h-[80vh]">
                <p>কুইজ নেই</p>
                <Link to="/course-player">
                    <Button type="button">Go To Course Player</Button>
                </Link>
            </div>
        );

    // If the active quiz already submitted
    if (isQuizPlayed)
        content = (
            <div className="flex flex-col justify-center items-center gap-6 min-h-[80vh]">
                <p>কুইজ দিয়েছেন</p>
                <Link to="/course-player">
                    <Button type="button">Go To Course Player</Button>
                </Link>
            </div>
        );

    // If quiz available with the active video
    if (activeQuiz?.length > 0 && !isQuizPlayed)
        content = (
            <>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">{activeVideo?.title}</h1>
                    <p className="text-sm text-slate-200">
                        Each question contains 5 Mark
                    </p>
                </div>

                <form className="space-y-8 ">
                    <div className="quiz">
                        <h4 className="question">{step.question}</h4>
                        <div className="quizOptions">
                            {step.options.map(({ id, option }, optionIndex) => (
                                <label key={id} htmlFor={id}>
                                    <input
                                        type="checkbox"
                                        id={id}
                                        checked={
                                            activeQuiz[stepIndex].options[
                                                optionIndex
                                            ].selected
                                        }
                                        onChange={(e) =>
                                            handleAnswerSelect(e, optionIndex)
                                        }
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <Button
                            onClick={handlePrevQuestion}
                            type={'button'}
                            disabled={isFirstStep}
                            style={
                                isFirstStep && 'opacity-50 cursor-not-allowed'
                            }
                        >
                            আগের কুইজ
                        </Button>
                        <Button
                            onClick={
                                !isLastStep
                                    ? handleNextQuestion
                                    : handleSubmitQuiz
                            }
                            type={isLastStep ? 'submit' : 'button'}
                        >
                            {isLastStep ? (
                                isLoading ? (
                                    <Loading />
                                ) : (
                                    'জমা দিন'
                                )
                            ) : (
                                'পরের কুইজ'
                            )}
                        </Button>
                    </div>
                </form>
            </>
        );

    return (
        <>
            <Meta title="Quiz" />
            {isModalOpen && (
                <QuizResultModal
                    closeHandler={closeHandler}
                    quizResult={quizResult}
                    activeQuiz={activeQuiz}
                />
            )}
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">{content}</div>
            </section>
        </>
    );
};

export default Quiz;
