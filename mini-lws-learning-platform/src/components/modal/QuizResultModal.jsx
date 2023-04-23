import closeIcon from '../../assets/icon/close.png';
import { useSteps } from '../../hooks/useSteps';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const QuizResultModal = ({ closeHandler, quizResult, activeQuiz }) => {
    const { step, prev, next, isFirstStep, isLastStep } = useSteps(activeQuiz);

    const { totalMark, totalWrong, totalCorrect, mark, totalQuiz } =
        quizResult || {};

    const navigate = useNavigate();

    // Close modal after confirm
    const closeModal = () => {
        if (
            confirm(
                'আপনি কি নিশ্চিত? \nকারন এই ফলাফল এবং উত্তরগুলো আর দেখতে পারবেন না'
            ) === true
        ) {
            closeHandler();

            // Navigate to leader board
            navigate('/leader-board');
        }
    };

    return (
        <div className="flex justify-center items-center w-full min-h-screen absolute inset-0 z-50 bg-slate-800/50 backdrop-blur-sm shadow-md ">
            <div className="relative container w-full p-8 border border-slate-800 bg-slate-900 rounded-md">
                <button
                    className="absolute -top-3 -right-3 bg-slate-600 hover:bg-slate-500 w-7 h-7 rounded-full flex justify-center items-center"
                    onClick={closeModal}
                >
                    <img src={closeIcon} className="w-3 h-3" alt="close" />
                </button>
                <h2 className="text-center text-3xl font-extrabold text-slate-100">
                    Quiz Result
                </h2>

                <div className="flex justify-between mt-6">
                    <div className=" space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="bg-green-500 w-5 h-5 rounded-full inline-block"></span>
                            সবুজ মার্ক করা উত্তরগুলো সঠিক উত্তর এবং আপনি সিলেক্ট
                            করেছিলেন
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="bg-red-500 w-5 h-5 rounded-full inline-block"></span>
                            লাল মার্ক করা উত্তরটি ভুল উত্তর। কিন্তু আপনি সিলেক্ট
                            করেছেনে।
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="bg-blue-500 w-5 h-5 rounded-full inline-block"></span>
                            নীল মার্ক করা উত্তরটি সঠিক কিন্তু আপনি সেটি সিলেক্ট
                            করেন নি।
                        </div>
                    </div>
                    <div className="flex gap-6 border border-slate-700 rounded p-6">
                        <div className="flex justify-around gap-6">
                            <div className="flex justify-center gap-1 flex-col items-center">
                                <span className="w-10 h-10 rounded-full flex flex-col gap-3 justify-center items-center text-sm bg-violet-500 font-semibold">
                                    {totalQuiz} টি
                                </span>
                                <small>মোট প্রশ্ন</small>
                            </div>
                            <div className="flex justify-center gap-1 flex-col items-center">
                                <span className="w-10 h-10 rounded-full flex flex-col gap-3 justify-center items-center text-sm bg-green-500 font-semibold">
                                    {totalCorrect} টি
                                </span>
                                <small>সঠিক উত্তর</small>
                            </div>
                            <div className="flex justify-center gap-1 flex-col items-center">
                                <span className="w-10 h-10 rounded-full flex flex-col gap-3 justify-center items-center text-sm bg-red-500 font-semibold">
                                    {totalWrong} টি
                                </span>
                                <small>ভুল উত্তর</small>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 border-l-2 pl-3 border-slate-700">
                            মার্কঃ
                            <span
                                className={`w-16 h-16 border-[5px] ${
                                    totalMark / 2 < mark
                                        ? 'border-teal-500'
                                        : 'border-red-500'
                                } rounded-full flex justify-center p-8 items-center text-xl font-bold`}
                            >
                                {mark}/{totalMark}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="quiz mt-6">
                    <h4 className="question">{step.question}</h4>
                    <div className="quizOptions">
                        {step.options.map(
                            ({ id, option, isCorrect, selected }) => {
                                return (
                                    <label
                                        key={id}
                                        htmlFor={id}
                                        className={`${
                                            isCorrect &&
                                            !selected &&
                                            '!bg-blue-500'
                                        } ${
                                            !isCorrect &&
                                            selected &&
                                            '!bg-red-500'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isCorrect}
                                            id={id}
                                        />
                                        {option}
                                    </label>
                                );
                            }
                        )}
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button
                            onClick={prev}
                            disabled={isFirstStep}
                            type={'button'}
                            style={
                                isFirstStep && 'opacity-50 cursor-not-allowed'
                            }
                        >
                            আগের উত্তর
                        </Button>
                        <Button
                            onClick={!isLastStep && next}
                            disabled={isLastStep}
                            type="button"
                            style={
                                isLastStep && 'opacity-50 cursor-not-allowed'
                            }
                        >
                            পরের উত্তর
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResultModal;
