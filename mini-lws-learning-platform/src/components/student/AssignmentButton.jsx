import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSubmittedAssignmentsQuery } from '../../features/assignment-mark/assignmentMarkApi';
import { useGetAssignmentsQuery } from '../../features/assignment/assignmentApi';
import {
    setActiveAssignment,
    setIsAssignmentSubmitted,
} from '../../features/player/playerSlice';
import SubmitAssignmentModal from '../modal/SubmitAssignmentModal';
import ButtonLoader from '../skeletons/ButtonLoader';

const AssignmentButton = () => {
    // Local state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get active video and the video related info from redux store
    const { activeVideo, activeAssignment, isAssignmentSubmitted } =
        useSelector((state) => state.player);

    // Get the logged in user from redux store
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    // Get submitted assignment to check assignment submit or not
    const { isLoading, data: submittedAssignments } =
        useGetSubmittedAssignmentsQuery();

    // Get assignments
    const { isLoading: isLoading2, data: assignments } =
        useGetAssignmentsQuery();

    /**
     * On active video change we are checking
     * 1. is assignment associate with the active video
     * 2. check the current user submitted assignment or not
     * -----------------------------------------------------------
     */
    useEffect(() => {
        // Find assignment available or not with the active video
        if (assignments?.length > 0) {
            const assignment = assignments.find(
                (item) => item.video_id === activeVideo?.id
            );

            if (assignment) {
                // Set as active assignment
                dispatch(setActiveAssignment(assignment));
            } else {
                // If there is no assignment with the active video then clear active assignment if previous is there
                dispatch(setActiveAssignment({}));
            }

            // Check the current user submitted assignment or not
            if (assignment && submittedAssignments?.length > 0) {
                const isAssignmentSubmit = submittedAssignments.some(
                    (item) =>
                        item.assignment_id === assignment.id &&
                        item?.student_id === user.id
                );

                // Set assignment submitted on not (set true/false)
                dispatch(setIsAssignmentSubmitted(isAssignmentSubmit));
            }
        }
    }, [activeVideo]);

    // handle modal
    const handleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    // Decide what content to display
    let content;

    // If loading
    if (isLoading || isLoading2) content = <ButtonLoader />;

    // If not loading and active assignment length getter than 0 and assignment submitted
    if (!isLoading && activeAssignment.id && isAssignmentSubmitted)
        content = (
            <button className="px-3 font-bold py-1 border border-cyan-500 rounded-full text-sm bg-cyan-500 text-slate-900">
                এসাইনমেন্ট জমা দিয়েছেন
            </button>
        );

    // If not loading and active assignment length getter than 0 and assignment not submitted
    if (!isLoading && activeAssignment.id && !isAssignmentSubmitted)
        content = (
            <button
                className="px-3 font-bold py-1 border border-cyan-500 text-cyan-500 rounded-full text-sm hover:bg-cyan-500 hover:text-slate-900"
                onClick={() => setIsModalOpen(true)}
            >
                এসাইনমেন্ট
            </button>
        );

    return (
        <>
            {isModalOpen && (
                <SubmitAssignmentModal closeHandler={handleModal} />
            )}

            {content}
        </>
    );
};

export default AssignmentButton;
