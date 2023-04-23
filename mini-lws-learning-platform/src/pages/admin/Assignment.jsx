import { useState } from 'react';
import Error from '../../components/common/Error';
import { deleteIcon, editIcon } from '../../components/common/Icons';
import AssignmentModal from '../../components/modal/AssignmentModal';
import Loading from '../../components/skeletons/Loading';
import {
    useDeleteAssignmentMutation,
    useGetAssignmentsQuery,
} from '../../features/assignment/assignmentApi';
import Meta from '../../components/common/Meta';

const Assignment = () => {
    //Local state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState(null);

    // Get assignments
    const { isLoading, isError, data: assignments } = useGetAssignmentsQuery();

    // Delete assignment hook
    const [deleteAssignment, {}] = useDeleteAssignmentMutation();

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
        deleteAssignment(id);
    };

    // Decide what content to display
    let content = '';

    // If loading
    if (true) content = <Loading />;

    // If not loading but error occurred
    if (!isLoading && isError)
        content = <Error message="Something went wrong." />;

    // If not loading and error occurred but assignments length is 0
    if (!isLoading && !isError && assignments.length === 0)
        content = <p>No assignment found!</p>;

    // // If not loading and no error occurred and assignments length is getter than 0
    if (!isLoading && !isError && assignments.length > 0)
        content = (
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                    <tr>
                        <th className="table-th">Title</th>
                        <th className="table-th">Video Title</th>
                        <th className="table-th">Mark</th>
                        <th className="table-th">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                    {assignments.map((assignment) => (
                        <tr key={assignment?.id}>
                            <td className="table-td">{assignment.title}</td>
                            <td className="table-td">
                                {assignment.video_title}
                            </td>
                            <td className="table-td">{assignment.totalMark}</td>
                            <td className="table-td flex gap-x-2">
                                <button
                                    onClick={() => deleteHandler(assignment.id)}
                                >
                                    {deleteIcon}
                                </button>
                                <button
                                    className="d"
                                    onClick={() => editHandler(assignment)}
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
            <Meta title="Assignment" />
            {isModalOpen && (
                <AssignmentModal
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
                                Add Assignment
                            </button>
                        </div>
                        <div className="overflow-x-auto mt-4">{content}</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Assignment;
