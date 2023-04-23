import { useEffect, useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import {
    useAddAssignmentMutation,
    useUpdateAssignmentMutation,
} from '../../features/assignment/assignmentApi';
import { useGetVideosQuery } from '../../features/video/videoApi';
import Loading from '../skeletons/Loading';
import { useGetAssignmentsQuery } from '../../features/assignment/assignmentApi';
import { toast } from 'react-toastify';
import CloseModalButton from '../common/CloseModalButton';

const AssignmentModal = ({ isEditing, editItem, closeHandler }) => {
    // Local state
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(
        editItem || {
            title: '',
            video_id: '',
            video_title: '',
            totalMark: '',
        }
    );

    // Get all available videos
    const { isLoading: isVideosLoading, data: videos } = useGetVideosQuery();

    // get all assignments
    const { data: assignments } = useGetAssignmentsQuery();

    // Add assignment hook
    const [addAssignment, { isLoading, isError, isSuccess }] =
        useAddAssignmentMutation();

    // Update assignment hook
    const [
        updateAssignment,
        {
            isLoading: isUpdating,
            isError: isUpdateError,
            isSuccess: isUpdateSuccess,
        },
    ] = useUpdateAssignmentMutation();

    // Handle input change
    const handleChange = (e) => {
        const name = e.target.name; // get the input field name
        const value = e.target.value; // get the input field value

        // If the input name is video
        if (name === 'video') {
            const title = value;
            // Find the video selected from input
            const video = videos.find((video) => video.title === title);

            // Check assignment already associate with the video or not
            const isAssignmentAdded = assignments.some(
                (item) => item?.video_id === video.id
            );

            // If already added assignment for this video
            if (isAssignmentAdded) {
                setError('Already added on this video');
                toast.warning('Already added on this video');

                // update for user experience but can't submit with the error
                setFormData({
                    ...formData,
                    video_title: video.title,
                });
            } else {
                // If no assignment added for this video
                // clear the error
                setError(null);

                // Update the input
                setFormData({
                    ...formData,
                    video_id: Number(video.id),
                    video_title: video.title,
                });
            }

            // If the input is not video
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // handle submit
    const handleSubmit = (e) => {
        // Reset form submit default behavior
        e.preventDefault();

        // If no error
        if (!error) {
            // if the form is edit mode
            if (isEditing) {
                // Update the assignment
                updateAssignment({ id: editItem?.id, data: formData });
            } else {
                // Add new assignment
                addAssignment(formData);
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
            <div className="relative lg:w-1/3 w-full p-8 border border-slate-800 bg-slate-900 rounded-md">
                <CloseModalButton closeHandler={closeHandler} />
                <h2 className="text-center text-3xl font-extrabold text-slate-100">
                    {isEditing ? 'Edit Assignment' : ' Add Assignment'}
                </h2>

                {isVideosLoading ? (
                    <div className="text-center mt-6">
                        <Loading />
                    </div>
                ) : (
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <InputField
                            label="Assignment Title"
                            name="title"
                            placeholder="Enter assignment title"
                            type="text"
                            errorMessage="Title is required"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Total Mark"
                            name="totalMark"
                            placeholder="Enter total mark"
                            type="number"
                            errorMessage="Total Mark is required and should be number: 0-9"
                            value={formData.totalMark}
                            onChange={handleChange}
                        />
                        <div className="mt-1 mb-2">
                            <label htmlFor="video">Assign To</label>
                            <select
                                name="video"
                                id="video"
                                className="form-control truncate"
                                required
                                errorMessage="Field is required"
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
                        <div>
                            <Button type="submit">
                                {isUpdating || isLoading ? (
                                    <Loading />
                                ) : isEditing ? (
                                    'Update'
                                ) : (
                                    'add New'
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AssignmentModal;
