import { createSlice } from "@reduxjs/toolkit";

const questionSlices = createSlice({
   name: "getQuestion",
   initialState: {
      loading: false,
      question: [],
      error: {},
   },
   reducers: {
      question_pending: (state) => {
         state.loading = true;
      },
      question_fulfilled: (state, action) => {
         state.loading = false;
         state.question = action.payload.questions;
      },
      question_rejected: (state, { payload }) => {
         console.log(payload);
         state.loading = false;
         state.errormsg = payload.message;
      },
   },
});
export const { question_pending, question_fulfilled, question_rejected } =
   questionSlices.actions;
export default questionSlices.reducer;
