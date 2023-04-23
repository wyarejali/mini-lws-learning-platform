import { useEffect, useState } from 'react';
import { useSubmitAssignmentMutation } from '../../features/assignment-mark/assignmentMarkApi';
import Error from '../common/Error';
import Button from '../common/Button';
import InputField from '../common/InputField';
import Loading from '../skeletons/Loading';
import { useSelector } from 'react-redux';
import CloseModalButton from '../common/CloseModalButton';

const SubmitAssignmentModal = ({ closeHandler }) => {
    const [repoUrl, setRepoUrl] = useState('');

    const { user } = useSelector((state) => state.auth);
    const { activeAssignment } = useSelector((state) => state.player);

    // Submit assignment
    const [submitAssignment, { isLoading, isError, error, isSuccess }] =
        useSubmitAssignmentMutation();

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (repoUrl) {
            if (
                confirm(
                    `আপনি কি নিশ্চিত Assignment জমা দিতে? \nআপনার url: "${repoUrl}"`
                ) == true
            ) {
                submitAssignment({
                    student_id: user.id,
                    student_name: user.name,
                    assignment_id: activeAssignment.id,
                    title: activeAssignment.title,
                    createdAt: new Date(),
                    totalMark: 100,
                    mark: 0,
                    repo_link: repoUrl,
                    status: 'pending',
                });
            }
        }
    };

    // Close modal after assignment submitted successfully
    useEffect(() => {
        if (isSuccess) {
            closeHandler();
        }
    }, [isSuccess]);

    return (
        <div className="flex justify-center items-center w-full min-h-screen fixed inset-0 z-50 bg-slate-800/50 backdrop-blur-sm shadow-md ">
            <div className="relative lg:w-1/3 w-full p-8 border border-slate-800 bg-slate-900 rounded-md">
                <CloseModalButton closeHandler={closeHandler} />
                <h2 className="text-center text-3xl font-extrabold text-slate-100">
                    Submit Assignment
                </h2>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <InputField
                        label="GigHub repository link"
                        name="title"
                        placeholder="https://github.com/wyarej/repo-link"
                        type="url"
                        required
                        pattern="^(?:https?://)?(?:www\.)?[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+(?:\/\S*)*(?:\?\S*)?(?:#\S*)?$"
                        errorMessage="Url is required and must be valid url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                    />

                    <div className="col-span-4 flex justify-between gap-6">
                        <div>
                            {isError && <Error message={error.message} />}
                        </div>
                        <Button type="submit">
                            {isLoading ? <Loading /> : 'জমা দিন'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitAssignmentModal;
