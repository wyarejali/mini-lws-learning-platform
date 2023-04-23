import { toast } from 'react-toastify';
import { apiSlice } from '../api/apiSlice';
import { setIsAssignmentSubmitted } from '../player/playerSlice';

// assignment api
export const assignmentMarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all student submitted assignments
        getSubmittedAssignments: builder.query({
            query: () => '/assignmentMark',
        }),

        // submit student assignment
        submitAssignment: builder.mutation({
            query: (data) => ({
                url: '/assignmentMark',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Pessimistically update redux store that the assignment is submitted
                    const { data } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getSubmittedAssignments',
                            undefined,
                            (draft) => {
                                draft.push(data);
                            }
                        )
                    );

                    dispatch(setIsAssignmentSubmitted(true));
                } catch (error) {
                    // Nothing to do handle error from ui
                }
            },
        }),

        // Update assignment mark
        updateAssignmentMark: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignmentMark/${id}`,
                method: 'PATCH',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Pessimistically update cache of assignments list
                    const { data: updatedAssignment } = await queryFulfilled;

                    // Update assignments list cache
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getSubmittedAssignments',
                            undefined,
                            (draft) => {
                                return draft.map((item) =>
                                    item.id === updatedAssignment.id
                                        ? updatedAssignment
                                        : item
                                );
                            }
                        )
                    );

                    toast.success('Mark added successfully');
                } catch (error) {
                    toast.error('Something went wrong, Try again');
                }
            },
        }),
    }),
});

export const {
    useGetSubmittedAssignmentsQuery,
    useUpdateAssignmentMarkMutation,
    useSubmitAssignmentMutation,
} = assignmentMarkApi;
