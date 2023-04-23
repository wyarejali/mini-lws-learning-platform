import SubmittedAssignment from '../../components/admin/SubmittedAssignment';
import Error from '../../components/common/Error';
import Meta from '../../components/common/Meta';
import Loading from '../../components/skeletons/Loading';
import { useGetSubmittedAssignmentsQuery } from '../../features/assignment-mark/assignmentMarkApi';

const AssignmentMark = () => {
    // Get submitted assignment
    const {
        isLoading,
        isError,
        data: submittedAssignments,
    } = useGetSubmittedAssignmentsQuery();

    // Decide what content to display
    let content = '';

    // If loading
    if (true) content = <Loading />;

    // If not loading but error occurred
    if (!isLoading && isError)
        content = <Error message="Something went wrong." />;

    // If not loading and error occurred but assignments length is 0
    if (!isLoading && !isError && submittedAssignments.length === 0)
        content = <p>No one submitted yet!</p>;

    // // If not loading and no error occurred and assignments length is getter than 0
    if (!isLoading && !isError && submittedAssignments.length > 0)
        content = (
            <>
                <ul className="assignment-status">
                    <li>
                        Total <span>{submittedAssignments.length}</span>
                    </li>
                    <li>
                        Pending
                        <span>
                            {
                                submittedAssignments.filter(
                                    (item) => item.status === 'pending'
                                ).length
                            }
                        </span>
                    </li>
                    <li>
                        Mark Sent
                        <span>
                            {
                                submittedAssignments.filter(
                                    (item) => item.status === 'published'
                                ).length
                            }
                        </span>
                    </li>
                </ul>
                <div className="overflow-x-auto mt-4">
                    <table className="divide-y-1 text-base divide-gray-600 w-full">
                        <thead>
                            <tr>
                                <th className="table-th">Assignment</th>
                                <th className="table-th">Date</th>
                                <th className="table-th">Student Name</th>
                                <th className="table-th">Repo Link</th>
                                <th className="table-th">Mark</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-600/50">
                            {submittedAssignments.map((item) => (
                                <SubmittedAssignment
                                    key={item.id}
                                    assignment={item}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );

    return (
        <>
            <Meta title="Assignment Mark" />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">{content}</div>
                </div>
            </section>
        </>
    );
};

export default AssignmentMark;
