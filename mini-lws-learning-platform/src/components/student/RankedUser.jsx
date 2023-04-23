import { useSelector } from 'react-redux';
import { cupIcon } from '../common/Icons';

const RankedUser = ({ user }) => {
    const { user: loggedInUser } = useSelector((state) => state.auth);

    return (
        <tr
            className={` ${
                user.id === loggedInUser.id
                    ? 'border-2 border-cyan-500'
                    : 'border-b border-slate-600/50'
            }`}
        >
            <td className="table-td text-center">
                {user.rank === 1 ? (
                    <span className="flex justify-center">{cupIcon}</span>
                ) : (
                    user.rank
                )}
            </td>
            <td className="table-td text-center">{user.name}</td>
            <td className="table-td text-center">{user.quizMark}</td>
            <td className="table-td text-center">{user.assignmentMark}</td>
            <td className="table-td text-center">{user.totalMark}</td>
        </tr>
    );
};

export default RankedUser;
