import { apiSlice } from '../api/apiSlice';
import { setIsQuizPlayed } from '../player/playerSlice';

// Inject end point
export const quizMarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all quiz mark
        getQuizMark: builder.query({
            query: () => '/quizMark',
        }),

        // Update quiz mark
        submitQuiz: builder.mutation({
            query: (data) => ({
                url: `/quizMark`,
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Pessimistically update cache of quizzes list
                    const { data } = await queryFulfilled;

                    // Update quiz mark cache
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getQuizMark',
                            undefined,
                            (draft) => {
                                draft.push(data);
                            }
                        )
                    );

                    // update course player
                    dispatch(setIsQuizPlayed(true));
                } catch (error) {
                    // Nothing to do for now
                }
            },
        }),
    }),
});

export const { useGetQuizMarkQuery, useSubmitQuizMutation } = quizMarkApi;
