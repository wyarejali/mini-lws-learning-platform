import { useEffect, useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { useGetVideosQuery } from '../../features/video/videoApi';
import Loading from '../skeletons/Loading';
import {
    useAddQuizMutation,
    useUpdateQuizMutation,
} from '../../features/quiz/quizApi';
import { toast } from 'react-toastify';
import CloseModalButton from '../common/CloseModalButton';

// Empty form
const emptyForm = {
    question: '',
    video_id: '',
    video_title: '',
    options: [
        { id: '1', option: '', isCorrect: false },
        { id: '2', option: '', isCorrect: false },
        { id: '3', option: '', isCorrect: false },
        { id: '4', option: '', isCorrect: false },
    ],
};

const QuizModal = ({ isEditing, editItem, closeHandler }) => {
    // Local state
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(editItem || emptyForm);

    // Get all available videos
    const { isLoading: isVideosLoading, data: videos } = useGetVideosQuery();

    // Add quiz hook
    const [addQuiz, { isLoading, isError, isSuccess }] = useAddQuizMutation();

    // Update quiz hook
    const [
        updateQuiz,
        {
            isLoading: isUpdating,
            isError: isUpdateError,
            isSuccess: isUpdateSuccess,
        },
    ] = useUpdateQuizMutation();

    // Handle input change
    const handleChange = (e) => {
        const name = e.target.name; // get the input field name
        const value = e.target.value; // get the input field value

        // Clear error if error occurred
        setError(null);

        if (name === 'video') {
            const video = videos.find((video) => video.title === value);

            setFormData({
                ...formData,
                video_id: Number(video.id),
                video_title: video.title,
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle option input change
    function handleOptionChange(e, index) {
        const value = e.target.value; // Get the value
        const newOptions = JSON.parse(JSON.stringify(formData.options)); // Deep copy

        newOptions[index].option = value;

        // Update form data
        setFormData({
            ...formData,
            options: newOptions,
        });
    }

    // Handle correct answer select
    function handleCorrectAnswer(index) {
        const newOptions = JSON.parse(JSON.stringify(formData.options)); // Deep copy

        newOptions[index].isCorrect = !newOptions[index].isCorrect;

        // Update form data
        setFormData({
            ...formData,
            options: newOptions,
        });
    }

    // handle submit
    const handleSubmit = (e) => {
        // Reset form submit default behavior
        e.preventDefault();

        if (!error) {
            if (isEditing) {
                // check the question have correct answer or not
                const isCorrectAnswer = formData.options.some(
                    (option) => option.isCorrect === true
                );
                if (isCorrectAnswer) {
                    // Update the assignment
                    updateQuiz({ id: editItem?.id, data: formData });
                } else {
                    toast.warning('At least on option should be correct');
                }
            } else {
                // check the question have correct answer or not
                const isCorrectAnswer = formData.options.some(
                    (option) => option.isCorrect === true
                );

                if (isCorrectAnswer) {
                    // Add new assignment
                    addQuiz(formData);
                } else {
                    toast.warning('At least on option should be correct');
                }
            }
        } else {
            toast.warning(error);
        }
    };

    // If error occurred on form submit
    useEffect(() => {
        if (isError || isUpdateError) {
            toast.error('Something went wrong. Try again');
        }
    }, [isError, isUpdateError]);

    // Navigate to video page after successfully added or updated video
    useEffect(() => {
        if (isSuccess || isUpdateSuccess) {
            closeHandler();
        }
    }, [isSuccess, isUpdateSuccess]);

    return (
        <div className="flex justify-center items-center w-full min-h-screen absolute inset-0 z-50 bg-slate-800/50 backdrop-blur-sm shadow-md ">
            <div className="relative lg:w-3/5 w-full p-8 border border-slate-800 bg-slate-900 rounded-md">
                <CloseModalButton closeHandler={closeHandler} />
                <h2 className="text-center text-3xl font-extrabold text-slate-100">
                    {isEditing ? 'Edit Quiz' : ' Add Quiz'}
                </h2>

                {isVideosLoading ? (
                    <div className="text-center mt-6">
                        <Loading />
                    </div>
                ) : (
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <InputField
                            label="Question"
                            name="question"
                            placeholder="Enter question"
                            type="text"
                            errorMessage="field is required"
                            value={formData.question}
                            onChange={handleChange}
                        />

                        <div>
                            <label htmlFor="video">Assign To</label>
                            <select
                                name="video"
                                id="video"
                                className="form-control rounded"
                                required
                                value={formData.video_title}
                                onChange={handleChange}
                            >
                                <option value="" hidden>
                                    Select Video
                                </option>
                                {videos?.map((video) => (
                                    <option
                                        key={video?.id}
                                        className="truncate"
                                        value={video.title}
                                    >
                                        {video?.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-x-6">
                            {formData.options.map((option, index) => (
                                <div key={option.id} className="relative">
                                    <InputField
                                        type="text"
                                        label={`Option-${option.id}`}
                                        name={`option-${option.id}`}
                                        value={option.option}
                                        errorMessage="Option is required"
                                        onChange={(e) =>
                                            handleOptionChange(e, index)
                                        }
                                    />

                                    <label
                                        htmlFor={`isCorrect-${option.id}`}
                                        className="absolute top-1 right-0 flex items-center"
                                    >
                                        <input
                                            className="mr-1 h-4 w-4 border-gray-300 text-violet-600 focus:ring-violet-600"
                                            type="checkbox"
                                            id={`isCorrect-${option.id}`}
                                            name={option.id}
                                            value={option.id}
                                            checked={option.isCorrect}
                                            onChange={() =>
                                                handleCorrectAnswer(index)
                                            }
                                        />
                                        isCorrect
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div>
                            <Button type="submit">
                                {isUpdating || isLoading ? (
                                    <Loading />
                                ) : isEditing ? (
                                    'Update Quiz'
                                ) : (
                                    'Save Quiz'
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default QuizModal;
