import { toast } from 'react-toastify';
import { apiSlice } from '../api/apiSlice';

// quizzes api
export const quizzesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all quizzes
        getQuizzes: builder.query({
            query: () => '/quizzes',
        }),

        // Get a specific quizzes
        getQuiz: builder.query({
            query: (id) => `/quizzes/${id}`,
        }),

        // Add new quizzes
        addQuiz: builder.mutation({
            query: (data) => ({
                url: '/quizzes',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Pessimistically update cache of quizzes list
                    const { data } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getQuizzes',
                            undefined,
                            (draft) => {
                                draft.push(data);
                            }
                        )
                    );

                    toast.success('Quiz added successfully!');
                } catch (error) {
                    toast.error('There is something went wrong!');
                }
            },
        }),

        // Edit a specific quizzes
        updateQuiz: builder.mutation({
            query: ({ id, data }) => ({
                url: `/quizzes/${id}`,
                method: 'PATCH',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Pessimistically update cache of quiz list
                    const { data: updatedQuiz } = await queryFulfilled;

                    // Update quiz list cache
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getQuizzes',
                            undefined,
                            (draft) => {
                                return draft.map((item) =>
                                    item.id === updatedQuiz.id
                                        ? updatedQuiz
                                        : item
                                );
                            }
                        )
                    );

                    // And update the single quiz cache
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getQuiz',
                            arg.id.toString(),
                            (draft) => {
                                return updatedQuiz;
                            }
                        )
                    );

                    toast.success('Quiz updated successfully!');
                } catch (error) {
                    toast.error('There is something went wrong');
                }
            },
        }),

        // Delete a specific quiz
        deleteQuiz: builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: 'DELETE',
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Optimistically update "getQuiz" cache when delete quiz initiate
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getQuizzes',
                        undefined,
                        (draft) => {
                            return draft.filter((quiz) => quiz.id != arg);
                        }
                    )
                );

                try {
                    const result = await queryFulfilled;

                    // Pessimistically update "getQuizzes" cache when delete successful
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getQuizzes',
                            arg,
                            (draft) => {
                                draft.filter(
                                    (quiz) => quiz.id !== arg.toString()
                                );
                            }
                        )
                    );

                    // Pessimistically update "getQuiz" cache when delete successful
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getQuiz',
                            arg,
                            (draft) => {
                                return;
                            }
                        )
                    );

                    toast.success('Quiz deleted successfully!');
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
    useGetQuizzesQuery,
    useGetQuizQuery,
    useAddQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation,
} = quizzesApi;
