import { useState } from 'react';
import { useUpdateAssignmentMarkMutation } from '../../features/assignment-mark/assignmentMarkApi';
import { timeFormatter } from '../../utils/timeFormatter';
import { checkMark } from '../common/Icons';
import Spinning from '../skeletons/Spinning';
import { toast } from 'react-toastify';

const SubmittedAssignment = ({ assignment }) => {
    // Local state
    const [mark, setMark] = useState(null);

    // Update mark
    const [updateAssignmentMark, { isLoading }] =
        useUpdateAssignmentMarkMutation();

    // Update mark handler
    const updateMarkHandler = (e) => {
        e.preventDefault();

        // Mark should be 0 - 100
        if (mark <= assignment?.totalMark) {
            updateAssignmentMark({
                id: assignment.id,
                data: {
                    ...assignment,
                    status: 'published',
                    mark: Number(mark),
                },
            });
        } else {
            toast.warning(
                `Mark is required and should be max ${assignment?.totalMark}`
            );
        }
    };

    return (
        <tr>
            <td className="table-td">{assignment.title}</td>
            <td className="table-td">{timeFormatter(assignment.createdAt)}</td>
            <td className="table-td">{assignment.student_name}</td>
            <td className="table-td">{assignment.repo_link}</td>
            <td className="table-td input-mark">
                {assignment.status === 'published' ? (
                    assignment.mark
                ) : (
                    <form onSubmit={updateMarkHandler}>
                        <input
                            max={assignment?.totalMark}
                            value={mark}
                            onChange={(e) => setMark(e.target.value)}
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? <Spinning /> : checkMark}
                        </button>
                    </form>
                )}
            </td>
        </tr>
    );
};

export default SubmittedAssignment;
