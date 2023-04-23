import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useAddVideoMutation,
    useUpdateVideoMutation,
} from '../../features/video/videoApi';
import InputField from '../common/InputField';
import Loading from '../skeletons/Loading';
import Button from '../common/Button';
import { toast } from 'react-toastify';

// Default value
const defaultValue = {
    title: '',
    url: '',
    views: '',
    duration: '',
    description: '',
};
const VideoForm = ({ isEditing, editItem }) => {
    // Local state
    const [formData, setFormData] = useState(editItem || defaultValue);

    const navigate = useNavigate();

    // Add video hook
    const [addVideo, { isLoading, isError, isSuccess }] = useAddVideoMutation();

    // Update video hook
    const [
        updateVideo,
        {
            isLoading: isUpdating,
            isError: isUpdateError,
            isSuccess: isUpdateSuccess,
        },
    ] = useUpdateVideoMutation();

    // Inputs
    const inputs = [
        {
            id: 1,
            name: 'title',
            type: 'text',
            placeholder: 'Enter video title',
            label: 'Video Title',
            required: true,
            errorMessage:
                'Title is required and should be at least 10 characters',
            pattern: '.{10,}',
        },
        {
            id: 2,
            name: 'url',
            type: 'url',
            placeholder: 'https://youtube.com/395fgklhaag',
            label: 'Video Url',
            required: true,
            errorMessage: 'Url is required and should be valid url',
        },
        {
            id: 3,
            name: 'views',
            type: 'text',
            placeholder: 'Enter video total views Ex: 3.5K',
            label: 'Views',
            required: true,
            errorMessage: 'Views is required. Ex: 3.5K',
            pattern: '^[0-9]+.[0-9]+[A-Z]|[0-9].+[A-Z]|[0-9]+',
        },
        {
            id: 4,
            name: 'duration',
            type: 'text',
            placeholder: 'Enter video duration ex: 30:49',
            label: 'Duration',
            required: true,
            errorMessage: 'Duration is required',
        },
        {
            id: 6,
            name: 'description',
            type: 'textarea',
            label: 'Description',
            required: true,
            errorMessage: 'Description is required',
        },
    ];

    // Handle change
    const handleChange = (e) => {
        const name = e.target.name; // get the input field name
        const value = e.target.value; // get the input field value

        const newVideo = { ...formData, [name]: value };

        // Set new video
        setFormData(newVideo);
    };

    // Handle form submit
    const handleSubmit = (e) => {
        // Reset form submit default behavior
        e.preventDefault();

        // Get the values from form data
        const { title, url, views, duration, description, id } = formData;

        if (isEditing) {
            // Update the video
            if (
                title !== '' &&
                url !== '' &&
                views !== '' &&
                duration !== '' &&
                description !== ''
            ) {
                updateVideo({
                    id,
                    data: formData,
                });
            } else {
                toast.warning('All field is required');
            }
        } else {
            // Check all field is fill-up
            if (
                title !== '' &&
                url !== '' &&
                views !== '' &&
                duration !== '' &&
                description !== ''
            ) {
                // Add new video
                addVideo({ ...formData, createdAt: new Date() });
            } else {
                toast.warning('All field is required');
            }
        }
    };

    // If error occurred on form submit
    useEffect(() => {
        if (isError || isUpdateError) {
            toast.error('Something went wrong');
        }
    }, [isError, isUpdateError]);

    // Navigate to video page after successfully added or updated video
    useEffect(() => {
        if (isSuccess || isUpdateSuccess) {
            navigate('/admin/videos');
        }
    }, [isSuccess, isUpdateSuccess]);

    return (
        <form className="grid grid-cols-4 gap-x-6" onSubmit={handleSubmit}>
            {inputs.map((input, i) => (
                <div
                    key={input.id}
                    className={i === 2 || i === 3 ? 'col-span-2' : 'col-span-4'}
                >
                    <InputField
                        {...input}
                        value={formData[input.name]}
                        onChange={handleChange}
                    />
                </div>
            ))}

            <div>
                <Button type={'submit'}>
                    {isUpdating || isLoading ? (
                        <Loading />
                    ) : isEditing ? (
                        'Update Video'
                    ) : (
                        'Add New Video'
                    )}
                </Button>
            </div>
        </form>
    );
};

export default VideoForm;
