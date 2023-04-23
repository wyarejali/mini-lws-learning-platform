import { apiSlice } from '../api/apiSlice';
import { toast } from 'react-toastify';

// Video api
export const videoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all videos
        getVideos: builder.query({
            query: () => '/videos',
        }),

        // Get a specific video
        getVideo: builder.query({
            query: (id) => `/videos/${id}`,
        }),

        // Add new video
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Pessimistically update cache of videos list
                    const { data } = await queryFulfilled;

                    // Update videos cache
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getVideos',
                            undefined,
                            (draft) => {
                                draft.push(data);
                            }
                        )
                    );

                    toast.success('Video added successfully');
                } catch (error) {
                    toast.error('Something went wrong');
                }
            },
        }),

        // Edit a specific video
        updateVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PATCH',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Pessimistically update cache of videos list
                    const { data: updatedVideo } = await queryFulfilled;

                    // Update videos list
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getVideos',
                            undefined,
                            (draft) => {
                                return draft.map((item) =>
                                    item.id === updatedVideo.id
                                        ? updatedVideo
                                        : item
                                );
                            }
                        )
                    );

                    // And update the single video cache
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getVideo',
                            arg.id.toString(),
                            (draft) => {
                                return updatedVideo;
                            }
                        )
                    );

                    toast.success('Video updated successfully!');
                } catch (error) {
                    toast.error('There is something went wrong');
                }
            },
        }),

        // Delete a specific video
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Optimistically update "getVideos" cache when delete video initiate
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getVideos',
                        undefined,
                        (draft) => {
                            return draft.filter((video) => video.id != arg);
                        }
                    )
                );

                try {
                    const result = await queryFulfilled;

                    // Pessimistically update "getVideo" and "getVideos" cache when delete successful
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getVideo',
                            arg,
                            (draft) => {
                                return;
                            }
                        )
                    );
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getVideos',
                            arg,
                            (draft) => {
                                draft.filter(
                                    (video) => video.id !== arg.toString()
                                );
                            }
                        )
                    );

                    toast.success('Video deleted successfully!');
                } catch (error) {
                    // Undo optimistic update if delete failed
                    patchResult.undo();

                    toast.error('There is something went wrong');
                }
            },
        }),
    }),
});

export const {
    useGetVideoQuery,
    useGetVideosQuery,
    useAddVideoMutation,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
} = videoApi;
