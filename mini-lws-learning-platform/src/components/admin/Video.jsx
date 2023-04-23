import { shortText } from '../../utils/shortText';
import { Link } from 'react-router-dom';
import { useDeleteVideoMutation } from '../../features/video/videoApi';
import { deleteIcon, editIcon } from '../common/Icons';
const Videos = ({ video }) => {
    // Delete video hook
    const [deleteVideo] = useDeleteVideoMutation();

    // Delete handler
    const deleteHandler = (id) => {
        deleteVideo(id);
    };

    return (
        <tr key={video.id}>
            <td className="table-td">{video.title}</td>
            <td className="table-td truncate overflow-hidden">
                {shortText(video.description, 60)}
            </td>
            <td className="table-td flex gap-x-2">
                <button onClick={() => deleteHandler(video.id)}>
                    {deleteIcon}
                </button>
                <Link to={`/admin/video/edit/${video.id}`}>{editIcon}</Link>
            </td>
        </tr>
    );
};

export default Videos;
