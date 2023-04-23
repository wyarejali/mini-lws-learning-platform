import { apiSlice } from '../api/apiSlice';

// Leader board api to get 3 api request with single query
export const leaderBoardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLeaderBoardInfo: builder.query({
            async queryFn(arg, queryApi, options, fetchInfo) {
                let data = null;
                let error = null;

                // Fetch users, assignment-marks, quiz-marks
                await Promise.all([
                    fetchInfo('/users'),
                    fetchInfo('/assignmentMark'),
                    fetchInfo('quizMark'),
                ])
                    .then((result) => {
                        const [users, assignmentMarks, quizMarks] = result;

                        // can't return the object from here so, set it in global variable
                        data = {
                            users: users.data,
                            assignmentMarks: assignmentMarks.data,
                            quizMarks: quizMarks.data,
                        };
                    })
                    .catch((err) => (error = { error: err.message }));

                // As "queryFn" requires to return an object
                return data ? { data } : { error };
            },
        }),
    }),
});

export const { useGetLeaderBoardInfoQuery } = leaderBoardApi;
