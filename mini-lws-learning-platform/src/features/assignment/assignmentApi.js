import { apiSlice } from '../api/apiSlice';
import { toast } from 'react-toastify';

// assignment api
export const assignmentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all assignments
        getAssignments: builder.query({
            query: () => '/assignments',
        }),

        // Get a specific assignment
        getAssignment: builder.query({
            query: (id) => `/assignments/${id}`,
        }),

        // Add new assignment
        addAssignment: builder.mutation({
            query: (data) => ({
                url: '/assignments',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Pessimistically update cache of assignments list
                    const { data } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getAssignments',
                            undefined,
                            (draft) => {
                                draft.push(data);
                            }
                        )
                    );

                    toast.success('Assignment added successfully!');
                } catch (error) {
                    toast.error('There is something went wrong');
                }
            },
        }),

        // Edit a specific assignment
        updateAssignment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignments/${id}`,
                method: 'PATCH',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Pessimistically update cache of assignments list
                    const { data: updatedAssignment } = await queryFulfilled;

                    // Update assignments list
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getAssignments',
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

                    // And update the single assignment cache
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getAssignment',
                            arg.id.toString(),
                            (draft) => {
                                return updatedAssignment;
                            }
                        )
                    );

                    toast.success('Assignment updated successfully');
                } catch (error) {
                    toast.error('There is something went wrong');
                }
            },
        }),

        // Delete a specific assignment
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: 'DELETE',
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Optimistically update "getAssignments" cache when delete assignment initiate
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getAssignments',
                        undefined,
                        (draft) => {
                            return draft.filter(
                                (assignment) => assignment.id != arg
                            );
                        }
                    )
                );

                try {
                    const result = await queryFulfilled;

                    // Pessimistically update "getAssignments" cache when delete successful
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getAssignments',
                            arg,
                            (draft) => {
                                draft.filter(
                                    (assignment) =>
                                        assignment.id !== arg.toString()
                                );
                            }
                        )
                    );

                    // Pessimistically update "getAssignment" cache when delete successful
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getAssignment',
                            arg,
                            (draft) => {
                                return;
                            }
                        )
                    );

                    toast.success('Assignment deleted successfully');
                } catch (error) {
                    // Undo optimistic update if delete failed
                    patchResult.undo();

                    toast.error('There is something went wrong');
                }
            },
        }),
    }),
});

// Export hooks
export const {
    useGetAssignmentsQuery,
    useGetAssignmentQuery,
    useAddAssignmentMutation,
    useUpdateAssignmentMutation,
    useDeleteAssignmentMutation,
} = assignmentsApi;
