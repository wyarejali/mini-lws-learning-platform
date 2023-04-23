import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    isLoading: {},
    activeVideo: null,
    activeQuiz: [],
    isQuizPlayed: false,
    activeAssignment: {},
    isAssignmentSubmitted: false,
};

// Create slice
const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        // Set active video
        setActiveVideo: (state, action) => {
            state.isLoading = false;
            state.activeVideo = action.payload;
        },

        // Set active assignment
        setActiveAssignment: (state, action) => {
            state.activeAssignment = action.payload;
        },

        // Set active quiz
        setActiveQuiz: (state, action) => {
            const quiz = [...action.payload];

            // Set selected each option as false by default as in the db change limitation
            const updatedQuiz = quiz.map((question) => {
                const updatedOptions = question.options.map((option) => ({
                    ...option,
                    selected: false,
                }));

                return { ...question, options: updatedOptions };
            });

            state.activeQuiz = updatedQuiz;
        },

        // Update active quizzes for result page
        updateActiveQuiz: (state, action) => {
            state.activeQuiz = action.payload;
        },

        // Set assignment submitted or not
        setIsAssignmentSubmitted: (state, action) => {
            state.isAssignmentSubmitted = action.payload;
        },

        // Set quiz played or not
        setIsQuizPlayed: (state, action) => {
            state.isQuizPlayed = action.payload;
        },

        // Reset player
        resetPlayer: (state, action) => {
            state.isLoading = {};
            state.activeVideo = null;
            state.activeQuiz = [];
            state.isQuizPlayed = false;
            state.activeAssignment = {};
            state.isAssignmentSubmitted = false;
        },
    },
});

export default playerSlice.reducer;
export const {
    setActiveVideo,
    setActiveAssignment,
    setActiveQuiz,
    updateActiveQuiz,
    setIsQuizPlayed,
    setIsAssignmentSubmitted,
    resetPlayer,
} = playerSlice.actions;
