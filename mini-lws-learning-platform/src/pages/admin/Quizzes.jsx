import { useState } from 'react';
import Error from '../../components/common/Error';
import { deleteIcon, editIcon } from '../../components/common/Icons';
import QuizModal from '../../components/modal/QuizModal';
import Loading from '../../components/skeletons/Loading';
import {
    useDeleteQuizMutation,
    useGetQuizzesQuery,
} from '../../features/quiz/quizApi';
import { shortText } from '../../utils/shortText';
import Meta from '../../components/common/Meta';

const Quizzes = () => {
    //Local state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState(null);

    // Quiz added hook
    const { isLoading, isError, data: quizzes } = useGetQuizzesQuery();

    // Quiz delete hook
    const [deleteQuiz, {}] = useDeleteQuizMutation();

    // Close modal handler
    const closeHandler = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditItem(null);
    };

    // Edit handler
    const editHandler = (value) => {
        setIsModalOpen(true);
        setIsEditing(true);
        setEditItem(value);
    };

    // Delete handler
    const deleteHandler = (id) => {
        deleteQuiz(id);
    };

    // Decide what content to display
    let content = '';

    // If loading
    if (true) content = <Loading />;

    // If not loading but error occurred
    if (!isLoading && isError)
        content = <Error message="Something went wrong." />;

    // If not loading and error occurred but quizzes length is 0
    if (!isLoading && !isError && quizzes.length === 0)
        content = <p>No quizzes found!</p>;

    // // If not loading and no error occurred and quizzes length is getter than 0
    if (!isLoading && !isError && quizzes.length > 0)
        content = (
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                    <tr>
                        <th className="table-th">Question</th>
                        <th className="table-th">Video</th>
                        <th className="table-th justify-center">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                    {quizzes.map((quiz) => (
                        <tr key={quiz?.id}>
                            <td className="table-td">
                                {shortText(quiz.question, 70)}
                            </td>
                            <td className="table-td">
                                {shortText(quiz.video_title, 80)}
                            </td>
                            <td className="table-td flex gap-x-2">
                                <button onClick={() => deleteHandler(quiz.id)}>
                                    {deleteIcon}
                                </button>
                                <button
                                    className="d"
                                    onClick={() => editHandler(quiz)}
                                >
                                    {editIcon}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );

    return (
        <>
            <Meta title="Quizzes" />
            {isModalOpen && (
                <QuizModal
                    closeHandler={closeHandler}
                    isEditing={isEditing}
                    editItem={editItem}
                />
            )}
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <button
                                className="btn ml-auto"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Add Quiz
                            </button>
                        </div>
                        <div className="overflow-x-auto mt-4">{content}</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Quizzes;
