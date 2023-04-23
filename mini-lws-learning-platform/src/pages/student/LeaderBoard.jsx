import { useEffect, useState } from 'react';
import { useGetLeaderBoardInfoQuery } from '../../features/leader-board/leaderBoardApi';
import Loading from '../../components/skeletons/Loading';
import Error from '../../components/common/Error';
import RankedUser from '../../components/student/RankedUser';
import { useSelector } from 'react-redux';
import Meta from '../../components/common/Meta';

const LeaderBoard = () => {
    // Local state
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    // Get logged in user
    const { user: loggedInUser } = useSelector((state) => state.auth);

    // Get leader board information
    const { isLoading, isError, isSuccess, data } =
        useGetLeaderBoardInfoQuery();

    /**
     * In the useEffect blew:
     * Calculate each student's quiz mark, assignment mark, and total mark.
     * Rank each student based on total mark.
     * Get logged in user's mark and position.
     * Filter all the student who own rank 20
     */
    useEffect(() => {
        if (isSuccess && data.users.length > 0) {
            const newUsers = data?.users
                .map((user) => {
                    // Get user assignment marks
                    const userAssignmentMark = data?.assignmentMarks.filter(
                        (assignment) => assignment.student_id === user.id
                    );

                    // Calculate total assignment mark
                    const totalAssignmentMark =
                        calculateAssignmentMark(userAssignmentMark);

                    // Get user quiz mark
                    const userQuizMark = data?.quizMarks.filter(
                        (quiz) => quiz.student_id === user.id
                    );

                    // Calculate total quiz mark
                    const totalQuizMark = calculateQuizMark(userQuizMark);

                    // Return user with new info
                    return {
                        ...user,
                        assignmentMark: totalAssignmentMark,
                        quizMark: totalQuizMark,
                        totalMark: totalAssignmentMark + totalQuizMark,
                    };
                })
                .sort((a, b) => b.totalMark - a.totalMark); // Sort them high mark to low mark

            // Rank them based on their total mark
            let rank = 1;

            const updatedUsers = newUsers.map((user, index) => {
                if (
                    index > 0 &&
                    user.totalMark < newUsers[index - 1].totalMark
                ) {
                    rank = index + 1;
                }

                // Return each user with rank property
                return { ...user, rank };
            });

            // Get loggedIn user
            const currentUserInfo = updatedUsers.find(
                (user) => user.id === loggedInUser.id
            );

            // Get top 20 users. filter users who own rank 20
            const top20User = updatedUsers.filter((user) => user.rank < 21);

            setUsers(top20User);
            setCurrentUser(currentUserInfo);
        }
    }, [isSuccess]);

    // Calculate assignment total mark
    const calculateAssignmentMark = (markArray = []) => {
        const total = markArray.reduce(
            (total, assignment) => Number(total) + Number(assignment?.mark),
            0
        );

        return total;
    };

    // Calculate quiz total mark
    const calculateQuizMark = (markArray = []) => {
        const total = markArray.reduce(
            (total, quiz) => Number(total) + Number(quiz?.mark),
            0
        );

        return total;
    };

    // Decide what content to display
    let content = '';

    // If loading
    if (isLoading) content = <Loading />;

    // If not loading but error occurred
    if (!isLoading && isError)
        content = <Error message="Something went wrong." />;

    // If not loading and error occurred but video length is 0
    if (!isLoading && !isError && users.length === 0)
        content = <p>No result found!</p>;

    // // If not loading and no error occurred and users length is getter than 0
    if (!isLoading && !isError && users.length > 0)
        content = (
            <>
                <h3 className="text-lg font-bold">Top 20 Result</h3>

                <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                    <thead>
                        <tr className="border-b border-slate-600/50">
                            <th className="table-th !text-center">Rank</th>
                            <th className="table-th !text-center">Name</th>
                            <th className="table-th !text-center">Quiz Mark</th>
                            <th className="table-th !text-center">
                                Assignment Mark
                            </th>
                            <th className="table-th !text-center">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <RankedUser key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>
            </>
        );

    return (
        <>
            <Meta title="Leaderboard" />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div>
                        {!isLoading && (
                            <>
                                <h3 className="text-lg font-bold">
                                    Your Position in Leaderboard
                                </h3>
                                <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                                    <thead>
                                        <tr>
                                            <th className="table-th !text-center">
                                                Rank
                                            </th>
                                            <th className="table-th !text-center">
                                                Name
                                            </th>
                                            <th className="table-th !text-center">
                                                Quiz Mark
                                            </th>
                                            <th className="table-th !text-center">
                                                Assignment Mark
                                            </th>
                                            <th className="table-th !text-center">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className="border-2 border-cyan-500">
                                            <td className="table-td text-center font-bold">
                                                {currentUser.rank}
                                            </td>
                                            <td className="table-td text-center font-bold">
                                                {currentUser.name}
                                            </td>
                                            <td className="table-td text-center font-bold">
                                                {currentUser.quizMark}
                                            </td>
                                            <td className="table-td text-center font-bold">
                                                {currentUser.assignmentMark}
                                            </td>
                                            <td className="table-td text-center font-bold">
                                                {currentUser.totalMark}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>

                    <div className="my-8">{content}</div>
                </div>
            </section>
        </>
    );
};

export default LeaderBoard;
